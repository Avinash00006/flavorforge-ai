"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button, Input, Loader, Modal, showToast } from "../../components/ui";
import RouteGuard from "../../components/RouteGuard";

// Backend API URL configuration (port 5000 matches our Express server)
const API_URL = "http://localhost:5000/api/content";

export default function Dashboard() {
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
  const [formTone, setFormTone] = useState("Engaging");

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
      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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

  // Fetch initial content and intercept Google OAuth parameters when page mounts
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

    fetchContent();
  }, []);

  /**
   * Handles real-time search input changes
   */
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchContent(val, selectedTypeFilter);
  };

  /**
   * Handles filter type dropdown changes
   */
  const handleTypeFilterChange = (e) => {
    const val = e.target.value;
    setSelectedTypeFilter(val);
    fetchContent(searchQuery, val);
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
        tone: formTone
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
      setFormTone("Engaging");
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
            <Button variant="primary" onClick={() => setIsCreateOpen(true)}>
              ✨ Generate AI Content
            </Button>
          </div>

          {/* Dynamic Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <h2 className="text-3xl font-extrabold text-orange-500">{generatedCount}</h2>
              <p className="mt-1 font-semibold text-gray-700 dark:text-gray-300">Generated Descriptions</p>
              <p className="mt-2 text-xs text-gray-500">Descriptions generated from raw ingredients</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <h2 className="text-3xl font-extrabold text-orange-500">{draftCount}</h2>
              <p className="mt-1 font-semibold text-gray-700 dark:text-gray-300">Saved Drafts</p>
              <p className="mt-2 text-xs text-gray-500">Unpublished copy waiting to be reviewed</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <h2 className="text-3xl font-extrabold text-orange-500">{totalCount}</h2>
              <p className="mt-1 font-semibold text-gray-700 dark:text-gray-300">Total Items</p>
              <p className="mt-2 text-xs text-gray-500">Total active requests loaded from server memory</p>
            </div>
          </div>

          {/* Search, Filter, and Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-12 p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50/30 dark:bg-zinc-950/30">
            <div className="w-full md:w-96">
              <Input
                placeholder="Search by title, description or content..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <label htmlFor="filter-type" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Filter Type:</label>
              <select
                id="filter-type"
                name="filter-type"
                value={selectedTypeFilter}
                onChange={handleTypeFilterChange}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-zinc-950 dark:text-zinc-50 transition-colors"
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
                <p className="text-sm text-gray-500">Retrieving items from backend...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl text-center">
                <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No content items found</p>
                <p className="text-sm text-gray-400 mt-1">Try refining your search query or generate new content!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/40 hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      {/* Title & Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                        
                        {/* Type Badge */}
                        <span className={`text-xs px-2.5 py-1 font-semibold rounded-full border ${
                          item.type === "description"
                            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                            : item.type === "branding"
                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        }`}>
                          {item.type === "description" ? "📄 Description" : item.type === "branding" ? "🎯 Branding" : "📢 Marketing"}
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
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)}>
                        👁️ View / Edit
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleToggleStatus(item)}>
                        {item.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20 transition-all text-sm"
                        title="Delete Content"
                      >
                        🗑️
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
          
          <Input
            label="Product Title / Brand Name *"
            placeholder="e.g. Spicy Pineapple Jam"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="content-type" className="font-medium text-sm text-zinc-950 dark:text-zinc-50">Content Type</label>
            <select
              id="content-type"
              name="content-type"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full text-zinc-950 dark:text-zinc-50 transition-colors"
            >
              <option value="description">Product Description</option>
              <option value="branding">Brand Positioning Profile</option>
              <option value="marketing">Marketing Copy / Ad Text</option>
            </select>
          </div>

          <Input
            label="Brief Description"
            placeholder="e.g. Sweet, spicy preserve with jalapeños"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />

          <Input
            label="Key Ingredients / Tech Specs"
            placeholder="e.g. Fresh Pineapple, Jalapeño, Pectin, Cane Sugar"
            value={formIngredients}
            onChange={(e) => setFormIngredients(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Audience"
              placeholder="e.g. Breakfast fans"
              value={formTargetAudience}
              onChange={(e) => setFormTargetAudience(e.target.value)}
            />
            
            <div className="flex flex-col gap-2">
              <label htmlFor="tone-select" className="font-medium text-sm text-zinc-950 dark:text-zinc-50">Tone</label>
              <select
                id="tone-select"
                name="tone-select"
                value={formTone}
                onChange={(e) => setFormTone(e.target.value)}
                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full text-zinc-950 dark:text-zinc-50 transition-colors"
              >
                <option value="Engaging">Engaging</option>
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Energetic">Energetic</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)} disabled={generating}>
              Cancel
            </Button>
            
            <div className="w-32">
              {generating ? (
                <div className="py-2.5">
                  <Loader size="sm" />
                </div>
              ) : (
                <Button variant="primary" type="submit">
                  Generate
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
              </p>
              {editingItem.ingredients && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Ingredients:</strong> {editingItem.ingredients}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500">GENERATED TEXT (EDITABLE)</label>
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