"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type PublishStatus = "draft" | "published";

export type CaseStudy = {
  id: string;
  clientName: string;
  projectTitle: string;
  heroHeadline: string;
  problemStatement: string;
  whatWeBuilt: string;
  resultsImpact: string;
  coverImageName: string;
  status: PublishStatus;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  coverImageName: string;
  body: string;
  tags: string[];
  status: PublishStatus;
  date: string;
};

export type CaseStudyInput = Omit<CaseStudy, "id">;
export type BlogPostInput = Omit<BlogPost, "id" | "date">;

type AdminStore = {
  hydrated: boolean;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
  addCaseStudy: (input: CaseStudyInput) => CaseStudy;
  updateCaseStudy: (id: string, input: CaseStudyInput) => void;
  deleteCaseStudy: (id: string) => void;
  addBlogPost: (input: BlogPostInput) => BlogPost;
  updateBlogPost: (id: string, input: BlogPostInput) => void;
  deleteBlogPost: (id: string) => void;
};

const ADMIN_PASSWORD = "admin123";
const AUTH_KEY = "comlabs-crm-authenticated";
const CASE_STUDIES_KEY = "comlabs-crm-case-studies";
const BLOG_POSTS_KEY = "comlabs-crm-blog-posts";

const starterCaseStudies: CaseStudy[] = [
  {
    id: "case-formula-lab",
    clientName: "Formula Lab",
    projectTitle: "Commerce experience rebuild",
    heroHeadline: "A cleaner product path for a growing D2C brand",
    problemStatement: "The previous site made product discovery and trust signals harder to scan.",
    whatWeBuilt: "A polished storefront structure with sharper sections and conversion-focused content.",
    resultsImpact: "Improved page clarity, faster handoff, and a stronger launch foundation.",
    coverImageName: "",
    status: "published",
  },
  {
    id: "case-with-hub",
    clientName: "With Hub",
    projectTitle: "SaaS marketing site",
    heroHeadline: "A product-led website for a modern platform",
    problemStatement: "The team needed a premium front door before scaling sales conversations.",
    whatWeBuilt: "Landing pages, visual system components, and a maintainable Next.js structure.",
    resultsImpact: "A more credible sales asset and reusable content architecture.",
    coverImageName: "",
    status: "draft",
  },
];

const starterBlogPosts: BlogPost[] = [
  {
    id: "blog-startup-website-scope",
    title: "How to scope a startup website rebuild",
    slug: "how-to-scope-a-startup-website-rebuild",
    coverImageName: "",
    body: "Start with positioning, page intent, conversion paths, and content ownership before design.",
    tags: ["strategy", "websites"],
    status: "published",
    date: "2026-06-16",
  },
  {
    id: "blog-product-ui-handoff",
    title: "What clean product UI handoff includes",
    slug: "what-clean-product-ui-handoff-includes",
    coverImageName: "",
    body: "A useful handoff covers states, edge cases, responsive behavior, and implementation notes.",
    tags: ["product", "ui"],
    status: "draft",
    date: "2026-06-16",
  },
];

const AdminContext = createContext<AdminStore | null>(null);

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(starterCaseStudies);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(starterBlogPosts);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsAuthenticated(window.localStorage.getItem(AUTH_KEY) === "true");
      setCaseStudies(readJson(CASE_STUDIES_KEY, starterCaseStudies));
      setBlogPosts(readJson(BLOG_POSTS_KEY, starterBlogPosts));
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(CASE_STUDIES_KEY, JSON.stringify(caseStudies));
    }
  }, [caseStudies, hydrated]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(blogPosts));
    }
  }, [blogPosts, hydrated]);

  const store = useMemo<AdminStore>(
    () => ({
      hydrated,
      isAuthenticated,
      login(password) {
        // TODO: replace hardcoded password check with the real authentication API.
        const accepted = password === ADMIN_PASSWORD;
        if (accepted) {
          window.localStorage.setItem(AUTH_KEY, "true");
          setIsAuthenticated(true);
        }
        return accepted;
      },
      logout() {
        window.localStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
      },
      caseStudies,
      blogPosts,
      addCaseStudy(input) {
        // TODO: replace local state persistence with create case study API call.
        const record = { ...input, id: createId("case") };
        setCaseStudies((current) => [record, ...current]);
        return record;
      },
      updateCaseStudy(id, input) {
        // TODO: replace local state persistence with update case study API call.
        setCaseStudies((current) =>
          current.map((record) => (record.id === id ? { ...record, ...input } : record)),
        );
      },
      deleteCaseStudy(id) {
        // TODO: replace local state persistence with delete case study API call.
        setCaseStudies((current) => current.filter((record) => record.id !== id));
      },
      addBlogPost(input) {
        // TODO: replace local state persistence with create blog post API call.
        const record = {
          ...input,
          id: createId("blog"),
          date: new Date().toISOString().slice(0, 10),
        };
        setBlogPosts((current) => [record, ...current]);
        return record;
      },
      updateBlogPost(id, input) {
        // TODO: replace local state persistence with update blog post API call.
        setBlogPosts((current) =>
          current.map((record) => (record.id === id ? { ...record, ...input } : record)),
        );
      },
      deleteBlogPost(id) {
        // TODO: replace local state persistence with delete blog post API call.
        setBlogPosts((current) => current.filter((record) => record.id !== id));
      },
    }),
    [blogPosts, caseStudies, hydrated, isAuthenticated],
  );

  return <AdminContext.Provider value={store}>{children}</AdminContext.Provider>;
}

export function useAdminStore() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminStore must be used inside AdminProvider");
  }
  return context;
}
