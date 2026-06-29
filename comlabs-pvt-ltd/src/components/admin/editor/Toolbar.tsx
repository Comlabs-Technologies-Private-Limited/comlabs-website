"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-border" />;
}

type ToolbarProps = {
  editor: Editor;
  onImageUpload: (file: File) => Promise<string>;
};

export function Toolbar({ editor, onImageUpload }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function setLink() {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function handleImageFile(file: File) {
    try {
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch {
      alert("Image upload failed. Please try again.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-card px-3 py-2">
      <ToolbarButton
        title="Bold (⌘B)"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton
        title="Italic (⌘I)"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={14} />
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        <Heading3 size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <List size={14} />
      </ToolbarButton>
      <ToolbarButton
        title="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <ListOrdered size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <Quote size={14} />
      </ToolbarButton>
      <ToolbarButton
        title="Code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      >
        <Code size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title={editor.isActive("link") ? "Remove link" : "Add link"}
        onClick={setLink}
        active={editor.isActive("link")}
      >
        {editor.isActive("link") ? <Link2Off size={14} /> : <Link2 size={14} />}
      </ToolbarButton>

      <ToolbarButton
        title="Insert image"
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={14} />
      </ToolbarButton>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleImageFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
