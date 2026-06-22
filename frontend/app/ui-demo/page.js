"use client";

import {
  Button,
  Input,
  Loader,
  showToast,
} from "@/components/ui";

export default function UIDemoPage() {
  return (
    <div className="min-h-screen p-10 space-y-8">
      <h1 className="text-4xl font-bold">
        FlavorForge UI Components
      </h1>

      <div className="flex gap-4 flex-wrap">
        <Button
          variant="primary"
          onClick={() =>
            showToast("AI Content Generated!")
          }
        >
          Generate Content
        </Button>

        <Button variant="secondary">
          Save Draft
        </Button>

        <Button variant="outline">
          Preview
        </Button>
      </div>

      <Input
        label="Product Name"
        placeholder="Enter product name"
      />

      <Loader size="lg" />
    </div>
  );
}