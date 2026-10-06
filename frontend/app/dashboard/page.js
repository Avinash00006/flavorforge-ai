"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button, EmptyState, Input, Loader, Modal, showToast } from "../../components/ui";
import RouteGuard from "../../components/RouteGuard";
import {
  SparklesIcon,
  DocumentIcon,
  TargetIcon,
  MegaphoneIcon,
  SearchIcon,
  EyeIcon,
  TrashIcon,
  CopyIcon
} from "../../components/Icons";

// Backend API URL configuration (port 5000 matches our Express server)
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/content`;

export default function Dashboard() {
  const router = useRouter();

  // State variables for managing content list and UI states
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");

  // State for the "Generate AI Content" Modal Form
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("description");
  const [formDescription, setFormDescription] = useState("");
  const [formIngredients, setFormIngredients] = useState("");
  const [formTargetAudience, setFormTargetAudience] = useState("");
  const [formTone, setFormTone] = useState("Sensory & Gourmet");
  const [formChannel, setFormChannel] = useState("Social Media Ad & Instagram / TikTok Hook");

  // State for the "View/Edit Content" Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editGeneratedText, setEditGeneratedText] = useState("");

  /**
   * Helper function to fetch all content items or run a search query from the backend.
   * Calls GET /api/content or GET /api/content/search depending on parameters.
   */
  const fetchContent = async (query = "", type = "all") => {
    setLoading(true);
    try {
      let url = API_URL;
      
      // If a search query or a type filter is active, call the backend search endpoint
      if (query || type !== "all") {
        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (type !== "all") params.append("type", type);
        url = `${API_URL}/search?${params.toString()}`;
      }

      // Fetch active JWT session token
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      // If token is missing, stop here without making an unauthorized request
      if (!token || token === 'null' || token === 'undefined') {
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Handle expired or invalid session token gracefully
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        setLoading(false);
        router.replace('/login');
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load content from server");
      }
      const result = await response.json();
      setItems(result.data || []);
    } catch (err) {
      console.error(err);
      showToast("Error loading content: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Intercept Google OAuth parameters when page mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const name = params.get('name');

    if (token) {
      // Save OAuth session keys to localStorage
      localStorage.setItem('token', token);
      if (email) localStorage.setItem('userEmail', email);
      if (name) localStorage.setItem('userName', name);

      // Clean address bar query string
      window.history.replaceState({}, document.title, window.location.pathname);

      // Dispatch storage event to alert UI header/Navbar
      window.dispatchEvent(new Event('storage'));
    }
  }, []);

  // Debounce API search queries to avoid flooding the server on every keystroke
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchContent(searchQuery, selectedTypeFilter);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedTypeFilter]);

  /**
   * Handles real-time search input changes
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handles filter type dropdown changes
   */
  const handleTypeFilterChange = (e) => {
    setSelectedTypeFilter(e.target.value);
  };

  /**
   * Handles POST /api/content to generate new content
   */
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast("Please enter a product title.");
      return;
    }

    setGenerating(true);
    try {
      const payload = {
        title: formTitle,
        type: formType,
        description: formDescription,
        ingredients: formIngredients,
        targetAudience: formTargetAudience,
        tone: formTone,
        channel: formType === "marketing" ? formChannel : ""
      };

      const token = localStorage.getItem('token');
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server error during generation");
      }

      const result = await response.json();
      
      // Toast notification for user feedback
      showToast("AI Content Generated!");
      
      // Reset form fields
      setFormTitle("");
      setFormDescription("");
      setFormIngredients("");
      setFormTargetAudience("");
      setFormTone("Sensory & Gourmet");
      setFormChannel("Social Media Ad & Instagram / TikTok Hook");
      setFormType("description");
      
      // Close modal and refresh list
      setIsCreateOpen(false);
      fetchContent(searchQuery, selectedTypeFilter);
    } catch (err) {
      console.error(err);
      showToast("Generation failed: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  /**
   * Handles PUT /api/content/:id to toggle the status (draft vs published)
   */
  const handleToggleStatus = async (item) => {
    try {
      const newStatus = item.status === "published" ? "draft" : "published";
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      showToast(`Content status updated to ${newStatus}`);
      fetchContent(searchQuery, selectedTypeFilter);
    } catch (err) {
      console.error(err);
      showToast("Update failed: " + err.message);
    }
  };

  /**
   * Opens the edit modal and sets the edit text state
   */
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditGeneratedText(item.generatedText);
    setIsEditOpen(true);
  };

  /**
   * Handles PUT /api/content/:id to save modified generated text
   */
  const handleSaveEdit = async () => {
    if (!editingItem) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${editingItem.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ generatedText: editGeneratedText })
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      showToast("Changes saved successfully!");
      setIsEditOpen(false);
      setEditingItem(null);
      fetchContent(searchQuery, selectedTypeFilter);
    } catch (err) {
      console.error(err);
      showToast("Edit failed: " + err.message);
    }
  };

  /**
   * Handles DELETE /api/content/:id to remove a content item
   */
  const handleDeleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this generated item?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      showToast("Content item deleted.");
      fetchContent(searchQuery, selectedTypeFilter);
    } catch (err) {
      console.error(err);
      showToast("Delete failed: " + err.message);
    }
  };

  // Copy generated text to clipboard helper
  const handleCopyText = () => {
    if (editGeneratedText) {
      navigator.clipboard.writeText(editGeneratedText);
      showToast("Copied text to clipboard!");
    }
  };

  // Derive counts dynamically from currently loaded state
  const generatedCount = items.filter(i => i.type === "description").length;
  const draftCount = items.filter(i => i.status === "draft").length;
  const totalCount = items.length;

  return (
    <RouteGuard>
      <Navbar />

      <main className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage your AI-generated product profiles, branding, and marketing copy.
              </p>
            </div>
            <Button variant="primary" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-white" />
              <span>Generate AI Content</span>
            </Button>
          </div>

          {/* Dynamic Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/60 backdrop-blur-md shadow-xs hover:border-amber-500/40 transition-all duration-200">
              <h2 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{generatedCount}</h2>
              <p className="mt-1 font-semibold text-stone-800 dark:text-stone-200">Generated Assets</p>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">Total culinary copies crafted with Gemini</p>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/60 backdrop-blur-md shadow-xs hover:border-amber-500/40 transition-all duration-200">
              <h2 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{draftCount}</h2>
              <p className="mt-1 font-semibold text-stone-800 dark:text-stone-200">Active Drafts</p>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">Unpublished copy waiting for sensory review</p>
            </div>

            <div className="p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/60 backdrop-blur-md shadow-xs hover:border-amber-500/40 transition-all duration-200">
              <h2 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{totalCount}</h2>
              <p className="mt-1 font-semibold text-stone-800 dark:text-stone-200">Total Catalog Items</p>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">Active records loaded from MongoDB Atlas</p>
            </div>
          </div>

          {/* Search, Filter, and Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-12 p-4 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl bg-white/70 dark:bg-stone-900/50 backdrop-blur-md shadow-xs">
            <div className="w-full md:w-96">
              <Input
                placeholder="Search by title, description or content..."
                value={searchQuery}
                onChange={handleSearchChange}
                icon={<SearchIcon className="w-4 h-4" />}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <label htmlFor="filter-type" className="text-sm font-semibold text-stone-500 dark:text-stone-400">Filter Type:</label>
              <select
                id="filter-type"
                name="filter-type"
                value={selectedTypeFilter}
                onChange={handleTypeFilterChange}
                className="bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-950 dark:text-stone-50 transition-colors shadow-xs"
              >
                <option value="all">All Content</option>
                <option value="description">Product Descriptions</option>
                <option value="branding">Brand Positioning</option>
                <option value="marketing">Marketing Copy</option>
              </select>
            </div>
          </div>

          {/* Content Listing Section */}
          <div className="mt-8">
            {loading ? (
              <div className="py-20 flex flex-col justify-center items-center gap-4">
                <Loader size="lg" />
                <p className="text-sm text-stone-500">Retrieving items from backend...</p>
              </div>
            ) : items.length === 0 ? (
              <EmptyState
                title="No content items found"
                description="Try refining your search query or generate a new food brand asset today!"
                icon="🍲"
                actionText="✨ Generate AI Content"
                onAction={() => setIsCreateOpen(true)}
              />
            ) : (
              <div className="grid gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl bg-white/75 dark:bg-stone-900/60 backdrop-blur-md hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      {/* Title & Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                        
                        {/* Type Badge */}
                        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 font-semibold rounded-full border ${
                          item.type === "description"
                            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                            : item.type === "branding"
                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        }`}>
                          {item.type === "description" ? (
                            <>
                              <DocumentIcon className="w-3.5 h-3.5" />
                              <span>Description</span>
                            </>
                          ) : item.type === "branding" ? (
                            <>
                              <TargetIcon className="w-3.5 h-3.5" />
                              <span>Branding</span>
                            </>
                          ) : (
                            <>
                              <MegaphoneIcon className="w-3.5 h-3.5" />
                              <span>Marketing</span>
                            </>
                          )}
                        </span>

                        {/* Status Badge */}
                        <span className={`text-xs px-2.5 py-1 font-semibold rounded-full border ${
                          item.status === "published"
                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                        }`}>
                          {item.status === "published" ? "Published" : "Draft"}
                        </span>
                      </div>

                      {/* Summary Description */}
                      {item.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Ingredients info */}
                      {item.ingredients && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          <strong className="font-semibold text-gray-600 dark:text-gray-400">Ingredients:</strong> {item.ingredients}
                        </p>
                      )}
                    </div>

                    {/* Actions Panel */}
                    <div className="flex gap-2 items-center flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)} className="flex items-center gap-1.5">
                        <EyeIcon className="w-3.5 h-3.5 text-stone-500" />
                        <span>View / Edit</span>
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleToggleStatus(item)}>
                        {item.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20 transition-all text-sm flex items-center justify-center"
                        title="Delete Content"
                        aria-label="Delete content"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 1. Modal for Content Generation */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Generate AI Content">
        <form onSubmit={handleCreateSubmit} className="space-y-4 mt-2">
          
          {/* Visual Content Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-xs tracking-wider uppercase text-stone-500 dark:text-stone-400">
              Content Asset Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFormType("description")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  formType === "description"
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 ring-2 ring-amber-500/30 shadow-xs"
                    : "border-stone-200/90 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <DocumentIcon className={`w-4 h-4 ${formType === "description" ? "text-amber-600 dark:text-amber-400" : "text-stone-400"}`} />
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">Product Description</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                  Mouthfeel, aroma & sensory pairings
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormType("branding")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  formType === "branding"
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 ring-2 ring-amber-500/30 shadow-xs"
                    : "border-stone-200/90 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TargetIcon className={`w-4 h-4 ${formType === "branding" ? "text-amber-600 dark:text-amber-400" : "text-stone-400"}`} />
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">Brand Positioning</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                  Mission, persona & value proposition
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormType("marketing")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  formType === "marketing"
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 ring-2 ring-amber-500/30 shadow-xs"
                    : "border-stone-200/90 dark:border-stone-800 bg-white/70 dark:bg-stone-900/50 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MegaphoneIcon className={`w-4 h-4 ${formType === "marketing" ? "text-amber-600 dark:text-amber-400" : "text-stone-400"}`} />
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">Marketing & Ads</span>
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                  High-converting hooks, CTAs & tags
                </span>
              </button>
            </div>
          </div>

          {/* Product Title / Brand Name */}
          <Input
            label={formType === "branding" ? "Brand Name / Concept *" : "Product Title / Brand Name *"}
            placeholder={
              formType === "description"
                ? "e.g. Spicy Pineapple Jam"
                : formType === "branding"
                ? "e.g. Ember & Oak Roasters"
                : "e.g. Zesty Lime Sparkling Tonic"
            }
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          {/* Key Ingredients / Culinary Core */}
          <Input
            label={
              formType === "description"
                ? "Key Ingredients & Flavor Notes *"
                : formType === "branding"
                ? "Core Ingredients & Culinary Philosophy *"
                : "Key Ingredients & Product Highlights *"
            }
            placeholder={
              formType === "description"
                ? "e.g. Fresh Pineapple, Smoked Jalapeño, Raw Cane Sugar, Lime Zest"
                : formType === "branding"
                ? "e.g. Single-origin heirloom beans, ethical direct-trade sourcing, low acid"
                : "e.g. Cold-pressed Tahitian limes, organic agave nectar, zero refined sugars"
            }
            value={formIngredients}
            onChange={(e) => setFormIngredients(e.target.value)}
          />

          {/* Secondary Context Field */}
          <Input
            label={
              formType === "description"
                ? "Texture, Mouthfeel & Serving Pairings (Optional)"
                : formType === "branding"
                ? "Brand Mission & Category Differentiators (Optional)"
                : "Campaign Angle & Special Offer (Optional)"
            }
            placeholder={
              formType === "description"
                ? "e.g. Velvety spread with mild heat. Pairs with goat cheese or grilled ribs."
                : formType === "branding"
                ? "e.g. Sustainable alternative to commercial coffee. 100% compostable bags."
                : "e.g. Summer BBQ launch, 20% off starter bundle, limited micro-batch drop."
            }
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />

          {/* Channel Selector for Marketing */}
          {formType === "marketing" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="channel-select" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Target Platform / Marketing Channel
              </label>
              <select
                id="channel-select"
                name="channel-select"
                value={formChannel}
                onChange={(e) => setFormChannel(e.target.value)}
                className="w-full border border-stone-200/80 dark:border-stone-800/80 rounded-xl px-4 py-2.5 text-sm bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-xs"
              >
                <option value="Social Media Ad & Instagram / TikTok Hook">Social Media Ad & Instagram / TikTok Hook</option>
                <option value="Amazon & E-Commerce Product Listing">Amazon & E-Commerce Product Listing</option>
                <option value="Email Newsletter & Promotional Blast">Email Newsletter & Promotional Blast</option>
                <option value="Packaging Callout & Back-of-Pack Blurb">Packaging Callout & Back-of-Pack Blurb</option>
                <option value="Google Search & Retargeting Ad">Google Search & Retargeting Ad</option>
              </select>
            </div>
          )}

          {/* Two-column Row: Target Audience & Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Target Audience"
              placeholder={
                formType === "description"
                  ? "e.g. Gourmet brunch lovers"
                  : formType === "branding"
                  ? "e.g. Third-wave coffee enthusiasts"
                  : "e.g. Health-conscious millennials"
              }
              value={formTargetAudience}
              onChange={(e) => setFormTargetAudience(e.target.value)}
            />
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tone-select" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Culinary Tone
              </label>
              <select
                id="tone-select"
                name="tone-select"
                value={formTone}
                onChange={(e) => setFormTone(e.target.value)}
                className="w-full border border-stone-200/80 dark:border-stone-800/80 rounded-xl px-4 py-2.5 text-sm bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-xs"
              >
                <option value="Sensory & Gourmet">Sensory & Gourmet (Luxurious, indulgent)</option>
                <option value="Artisanal & Rustic">Artisanal & Rustic (Farm-to-table, craft)</option>
                <option value="Playful & Bold">Playful & Bold (Vibrant, snackable, punchy)</option>
                <option value="Wholesome & Clean">Wholesome & Clean (Organic, wellness)</option>
                <option value="Direct & High-Energy">Direct & High-Energy (Fast, retail sales)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)} disabled={generating}>
              Cancel
            </Button>
            
            <div className="w-36">
              {generating ? (
                <div className="py-2.5 flex justify-center">
                  <Loader size="sm" />
                </div>
              ) : (
                <Button variant="primary" type="submit" className="flex items-center justify-center gap-1.5 w-full">
                  <SparklesIcon className="w-4 h-4 text-white" />
                  <span>Generate</span>
                </Button>
              )}
            </div>
          </div>

        </form>
      </Modal>

      {/* 2. Modal for View & Edit Generated Text */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? `Review Generated: ${editingItem.title}` : "View Content"}
      >
        {editingItem && (
          <div className="space-y-4 mt-2">
            <div>
              <span className="text-xs font-semibold text-gray-500">PRODUCT ATTRIBUTES</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                <strong>Type:</strong> {editingItem.type.toUpperCase()} | <strong>Tone:</strong> {editingItem.tone}
                {editingItem.channel && <span> | <strong>Channel:</strong> {editingItem.channel}</span>}
              </p>
              {editingItem.ingredients && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Ingredients:</strong> {editingItem.ingredients}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500">GENERATED TEXT (EDITABLE)</label>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:text-orange-600 font-semibold transition-colors"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </button>
              </div>
              <textarea
                value={editGeneratedText}
                onChange={(e) => setEditGeneratedText(e.target.value)}
                className="w-full h-48 border border-gray-300 dark:border-zinc-700 rounded-lg p-3 bg-gray-50 dark:bg-zinc-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-black dark:text-white font-sans leading-relaxed"
                placeholder="Generated copy appears here..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingItem(null);
                }}
              >
                Close
              </Button>
              <Button variant="primary" type="button" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </RouteGuard>
  );
}