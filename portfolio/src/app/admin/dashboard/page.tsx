"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Briefcase, Layers, Star, HelpCircle, Info,
  Mail, LogOut, Save, Plus, Trash2, X, Check,
  ChevronDown, ChevronUp, Eye, Settings, Award, Menu, Upload, ImageIcon
} from "lucide-react";
import { portfolioData } from "@/lib/data";
import { useRouter } from "next/navigation";

type TabId = "personal" | "about" | "projects" | "services" | "experience" | "testimonials" | "faq" | "contacts" | "settings";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "personal", label: "Personal", icon: <User size={16} /> },
  { id: "about", label: "About", icon: <Info size={16} /> },
  { id: "projects", label: "Projects", icon: <Layers size={16} /> },
  { id: "services", label: "Services", icon: <Briefcase size={16} /> },
  { id: "experience", label: "Experience", icon: <Award size={16} /> },
  { id: "testimonials", label: "Testimonials", icon: <Star size={16} /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle size={16} /> },
  { id: "contacts", label: "Contacts", icon: <Mail size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cmsData, setCmsData] = useState(portfolioData);
  const [contacts, setContacts] = useState<unknown[]>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((d) => { if (d && Object.keys(d).length > 0) setCmsData(d); })
      .catch(() => {});
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setContacts)
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cmsData),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  function switchTab(id: TabId) {
    setActiveTab(id);
    setSidebarOpen(false);
  }

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
          <div>
            <div className="text-sm font-semibold text-text-primary">Portfolio CMS</div>
            <div className="text-xs text-text-muted">Admin Dashboard</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-text-muted hover:text-white p-1">
            <X size={18} />
          </button>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-accent-blue/15 text-accent-blue border border-accent-blue/20"
                : "text-text-secondary hover:text-text-primary hover:bg-white/4"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === "contacts" && (contacts as unknown[]).length > 0 && (
              <span className="ml-auto bg-accent-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {(contacts as unknown[]).length}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/6 space-y-1">
        <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-white/4 transition-all">
          <Eye size={16} /> View Portfolio
        </a>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/8 transition-all">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#080B14] overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-[#0D1117] border-r border-white/6 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0D1117] border-r border-white/6 flex flex-col lg:hidden">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 sm:h-16 border-b border-white/6 flex items-center justify-between px-4 sm:px-6 bg-[#0D1117]/50 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors flex-shrink-0">
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-heading font-semibold text-text-primary capitalize truncate">{activeTab}</h1>
              <p className="text-xs text-text-muted hidden sm:block">Manage your portfolio content</p>
            </div>
          </div>
          <button onClick={handleSave} disabled={saving}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
              saved ? "bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30"
                    : "bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-glow-blue"
            }`}>
            {saved ? <><Check size={14} /> Saved!</> : saving ? "Saving..." : <><Save size={14} /> <span className="hidden sm:inline">Save Changes</span><span className="sm:hidden">Save</span></>}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {activeTab === "personal" && <PersonalEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "about" && <AboutEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "projects" && <ProjectsEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "services" && <ServicesEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "experience" && <ExperienceEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "testimonials" && <TestimonialsEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "faq" && <FAQEditor data={cmsData} onChange={setCmsData} />}
              {activeTab === "contacts" && <ContactsView contacts={contacts as ContactEntry[]} />}
              {activeTab === "settings" && <SettingsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ─── Helpers ─── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent-blue/40 transition-all" />
  );
}
function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
      className="w-full px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent-blue/40 transition-all resize-none" />
  );
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/3 rounded-2xl p-4 sm:p-5 border border-white/6 ${className}`}>{children}</div>;
}
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg sm:text-xl font-heading font-bold text-text-primary">{title}</h2>
      {subtitle && <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>}
    </div>
  );
}

/* Image upload helper — stores as public URL or base64 preview */
function ImageUpload({ value, onChange, label = "Image" }: { value: string; onChange: (v: string) => void; label?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="flex gap-2">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://... or upload below"
          className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent-blue/40 transition-all" />
        <button type="button" onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-accent-blue/15 text-accent-blue text-sm hover:bg-accent-blue/25 transition-colors flex-shrink-0">
          <Upload size={14} /> <span className="hidden sm:inline">Upload</span>
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && (value.startsWith("data:") || value.startsWith("http") || value.startsWith("/")) && (
        <div className="mt-2 relative w-20 h-14 rounded-lg overflow-hidden border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

type PortfolioDataType = typeof portfolioData;

/* ─── Personal Editor ─── */
function PersonalEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const p = data.personal;
  const set = (key: string, val: string | number) => onChange({ ...data, personal: { ...p, [key]: val } });

  return (
    <div className="space-y-5 max-w-2xl">
      <SectionTitle title="Personal Information" subtitle="Basic info shown across the portfolio" />
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name"><Input value={p.name} onChange={(v) => set("name", v)} /></Field>
          <Field label="Title"><Input value={p.title} onChange={(v) => set("title", v)} /></Field>
          <Field label="Email"><Input value={p.email} onChange={(v) => set("email", v)} type="email" /></Field>
          <Field label="Phone"><Input value={p.phone} onChange={(v) => set("phone", v)} /></Field>
          <Field label="Location"><Input value={p.location} onChange={(v) => set("location", v)} /></Field>
          <Field label="Available From"><Input value={p.availableFrom} onChange={(v) => set("availableFrom", v)} /></Field>
          <Field label="Years Experience"><Input value={String(p.yearsExperience)} onChange={(v) => set("yearsExperience", parseInt(v) || 0)} type="number" /></Field>
          <Field label="Projects Completed"><Input value={String(p.projectsCompleted)} onChange={(v) => set("projectsCompleted", parseInt(v) || 0)} type="number" /></Field>
          <Field label="Happy Clients"><Input value={String(p.happyClients)} onChange={(v) => set("happyClients", parseInt(v) || 0)} type="number" /></Field>
          <Field label="Awards Won"><Input value={String(p.awards)} onChange={(v) => set("awards", parseInt(v) || 0)} type="number" /></Field>
        </div>
        <div className="mt-4 space-y-4">
          <Field label="Tagline"><Input value={p.tagline} onChange={(v) => set("tagline", v)} /></Field>
          <Field label="Short Bio"><Textarea value={p.bio} onChange={(v) => set("bio", v)} rows={3} /></Field>
          <Field label="Long Bio"><Textarea value={p.longBio} onChange={(v) => set("longBio", v)} rows={4} /></Field>
          <Field label="Resume URL"><Input value={p.resumeUrl} onChange={(v) => set("resumeUrl", v)} /></Field>
        </div>
      </Card>

      <SectionTitle title="Social Links" subtitle="Update your social profile URLs" />
      <Card>
        <div className="space-y-4">
          {data.social.map((s, i) => (
            <Field key={s.icon} label={s.name}>
              <Input value={s.url} onChange={(v) => {
                const social = data.social.map((x, idx) => idx === i ? { ...x, url: v } : x);
                onChange({ ...data, social });
              }} placeholder={`https://${s.name.toLowerCase()}.com/...`} />
            </Field>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── About Editor ─── */
function AboutEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const p = data.personal;
  const set = (key: string, val: string) => onChange({ ...data, personal: { ...p, [key]: val } });

  const strengths = [
    "End-to-end project delivery from concept to production",
    "Deep understanding of brand strategy and visual communication",
    "Production-ready files across print, digital, and motion",
    "Same-day response time and clear revision process",
  ];

  return (
    <div className="space-y-5 max-w-2xl">
      <SectionTitle title="About Section" subtitle="Content shown in the About Me section" />

      <Card>
        <div className="space-y-4">
          <Field label="Section Heading">
            <Input value="Crafting Visual Experiences That Endure" onChange={() => {}} placeholder="Section heading" />
          </Field>
          <Field label="Short Bio (shown in About)">
            <Textarea value={p.bio} onChange={(v) => set("bio", v)} rows={3} />
          </Field>
          <Field label="Long Bio (full description)">
            <Textarea value={p.longBio} onChange={(v) => set("longBio", v)} rows={5} />
          </Field>
          <Field label="Tagline">
            <Input value={p.tagline} onChange={(v) => set("tagline", v)} />
          </Field>
        </div>
      </Card>

      <SectionTitle title="Profile Photo" subtitle="Photo shown in Hero and About sections" />
      <Card>
        <ImageUpload
          value="/1.png"
          onChange={() => {}}
          label="Profile Image"
        />
        <p className="text-xs text-text-muted mt-3">
          To update your profile photo, place the image file in the <code className="text-accent-blue font-mono">public/</code> folder and name it <code className="text-accent-blue font-mono">1.png</code>.
        </p>
      </Card>

      <SectionTitle title="Key Strengths" subtitle="Bullet points shown in About section" />
      <Card>
        <div className="space-y-3">
          {strengths.map((s, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-accent-emerald mt-2.5 flex-shrink-0">✓</span>
              <input
                value={s}
                readOnly
                className="flex-1 px-3 py-2 rounded-xl bg-white/4 border border-white/8 text-text-secondary text-sm focus:outline-none"
              />
            </div>
          ))}
          <p className="text-xs text-text-muted mt-2">Edit these in <code className="text-accent-blue font-mono">src/components/sections/About.tsx</code></p>
        </div>
      </Card>

      <SectionTitle title="Stats" subtitle="Numbers shown in the stats grid" />
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Graphic Design Projects">
            <Input value={String(p.graphicDesign)} onChange={(v) => set("graphicDesign", v)} type="number" />
          </Field>
          <Field label="Photo Editing Projects">
            <Input value={String(p.photoEditing)} onChange={(v) => set("photoEditing", v)} type="number" />
          </Field>
          <Field label="Video Editing Projects">
            <Input value={String(p.videoEditing)} onChange={(v) => set("videoEditing", v)} type="number" />
          </Field>
          <Field label="3D Modeling Projects">
            <Input value={String(p.modeling3d)} onChange={(v) => set("modeling3d", v)} type="number" />
          </Field>
        </div>
      </Card>
    </div>
  );
}

/* ─── Projects Editor ─── */
function ProjectsEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const projects = data.projects;

  function updateProject(id: string, key: string, val: string | boolean) {
    onChange({ ...data, projects: projects.map((p) => (p.id === id ? { ...p, [key]: val } : p)) });
  }
  function removeProject(id: string) {
    onChange({ ...data, projects: projects.filter((p) => p.id !== id) });
  }
  function addProject() {
    const id = `project-${Date.now()}`;
    const newProject = {
      id, title: "New Project", category: "Design", year: new Date().getFullYear(),
      duration: "4 weeks", role: "Designer", description: "Project description...",
      longDescription: "", tags: [], technologies: [],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      featured: false, liveUrl: "#",
    };
    onChange({ ...data, projects: [...projects, newProject] });
    setExpanded(id);
  }

  return (
    <div className="max-w-3xl space-y-3">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle title="Projects" subtitle={`${projects.length} projects`} />
        <button onClick={addProject} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-blue/15 text-accent-blue text-sm hover:bg-accent-blue/25 transition-colors flex-shrink-0">
          <Plus size={14} /> Add Project
        </button>
      </div>
      {projects.map((project) => (
        <Card key={project.id}>
          <div className="flex items-center justify-between cursor-pointer gap-2" onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-accent-blue/15">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><ImageIcon size={15} className="text-accent-blue" /></div>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-primary truncate">{project.title}</div>
                <div className="text-xs text-text-muted">{project.category} · {project.year}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/15 text-accent-blue border border-accent-blue/20 hidden sm:inline">Featured</span>}
              <button onClick={(e) => { e.stopPropagation(); removeProject(project.id); }} className="text-red-400/50 hover:text-red-400 p-1 rounded">
                <Trash2 size={14} />
              </button>
              {expanded === project.id ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
            </div>
          </div>
          <AnimatePresence>
            {expanded === project.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="pt-4 mt-4 border-t border-white/6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Title"><Input value={project.title} onChange={(v) => updateProject(project.id, "title", v)} /></Field>
                    <Field label="Category"><Input value={project.category} onChange={(v) => updateProject(project.id, "category", v)} /></Field>
                    <Field label="Year"><Input value={String(project.year)} onChange={(v) => updateProject(project.id, "year", v)} /></Field>
                    <Field label="Duration"><Input value={project.duration} onChange={(v) => updateProject(project.id, "duration", v)} /></Field>
                    <Field label="Role"><Input value={project.role} onChange={(v) => updateProject(project.id, "role", v)} /></Field>
                    <Field label="Live URL"><Input value={project.liveUrl || ""} onChange={(v) => updateProject(project.id, "liveUrl", v)} /></Field>
                  </div>
                  <ImageUpload value={project.image} onChange={(v) => updateProject(project.id, "image", v)} label="Project Image" />
                  <Field label="Description"><Textarea value={project.description} onChange={(v) => updateProject(project.id, "description", v)} /></Field>
                  <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                    <input type="checkbox" checked={project.featured} onChange={(e) => updateProject(project.id, "featured", e.target.checked)} className="accent-accent-blue" />
                    Mark as Featured
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}

/* ─── Services Editor ─── */
function ServicesEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const services = data.services;

  function updateService(id: string, key: string, val: string) {
    onChange({ ...data, services: services.map((s) => (s.id === id ? { ...s, [key]: val } : s)) });
  }
  function addService() {
    const id = `service-${Date.now()}`;
    onChange({ ...data, services: [...services, { id, icon: "Layers", title: "New Service", description: "Service description...", features: [], price: "Starting at $300", duration: "1–2 weeks", color: "blue" }] });
    setExpanded(id);
  }
  function removeService(id: string) {
    onChange({ ...data, services: services.filter((s) => s.id !== id) });
  }

  return (
    <div className="max-w-3xl space-y-3">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle title="Services" subtitle={`${services.length} services`} />
        <button onClick={addService} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-purple/15 text-accent-purple text-sm hover:bg-accent-purple/25 transition-colors flex-shrink-0">
          <Plus size={14} /> Add Service
        </button>
      </div>
      {services.map((service) => (
        <Card key={service.id}>
          <div className="flex items-center justify-between cursor-pointer gap-2" onClick={() => setExpanded(expanded === service.id ? null : service.id)}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-accent-purple/15 flex items-center justify-center flex-shrink-0">
                <Briefcase size={15} className="text-accent-purple" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-primary truncate">{service.title}</div>
                <div className="text-xs text-text-muted">{service.price} · {service.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={(e) => { e.stopPropagation(); removeService(service.id); }} className="text-red-400/50 hover:text-red-400 p-1 rounded">
                <Trash2 size={14} />
              </button>
              {expanded === service.id ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
            </div>
          </div>
          <AnimatePresence>
            {expanded === service.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="pt-4 mt-4 border-t border-white/6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Title"><Input value={service.title} onChange={(v) => updateService(service.id, "title", v)} /></Field>
                  <Field label="Price"><Input value={service.price} onChange={(v) => updateService(service.id, "price", v)} /></Field>
                  <Field label="Duration"><Input value={service.duration} onChange={(v) => updateService(service.id, "duration", v)} /></Field>
                  <div className="sm:col-span-2"><Field label="Description"><Textarea value={service.description} onChange={(v) => updateService(service.id, "description", v)} /></Field></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}

/* ─── Experience Editor ─── */
function ExperienceEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const experience = data.experience;

  function updateExp(i: number, key: string, val: string) {
    onChange({ ...data, experience: experience.map((e, idx) => (idx === i ? { ...e, [key]: val } : e)) });
  }
  function addExp() {
    onChange({ ...data, experience: [...experience, { company: "Company Name", role: "Your Role", duration: "2024 – Present", location: "Kathmandu, Nepal", description: "Role description...", highlights: [], color: "blue" }] });
    setExpanded(experience.length);
  }
  function removeExp(i: number) {
    onChange({ ...data, experience: experience.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="max-w-3xl space-y-3">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle title="Work Experience" />
        <button onClick={addExp} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-blue/15 text-accent-blue text-sm hover:bg-accent-blue/25 transition-colors flex-shrink-0">
          <Plus size={14} /> Add
        </button>
      </div>
      {experience.map((exp, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between cursor-pointer gap-2" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-text-primary truncate">{exp.company}</div>
              <div className="text-xs text-text-muted">{exp.role} · {exp.duration}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={(e) => { e.stopPropagation(); removeExp(i); }} className="text-red-400/50 hover:text-red-400 p-1 rounded">
                <Trash2 size={14} />
              </button>
              {expanded === i ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
            </div>
          </div>
          <AnimatePresence>
            {expanded === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="pt-4 mt-4 border-t border-white/6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Company"><Input value={exp.company} onChange={(v) => updateExp(i, "company", v)} /></Field>
                  <Field label="Role"><Input value={exp.role} onChange={(v) => updateExp(i, "role", v)} /></Field>
                  <Field label="Duration"><Input value={exp.duration} onChange={(v) => updateExp(i, "duration", v)} /></Field>
                  <Field label="Location"><Input value={exp.location} onChange={(v) => updateExp(i, "location", v)} /></Field>
                  <div className="sm:col-span-2"><Field label="Description"><Textarea value={exp.description} onChange={(v) => updateExp(i, "description", v)} /></Field></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}

/* ─── Testimonials Editor ─── */
function TestimonialsEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const testimonials = data.testimonials;
  function updateT(i: number, key: string, val: string) {
    onChange({ ...data, testimonials: testimonials.map((t, idx) => (idx === i ? { ...t, [key]: val } : t)) });
  }
  function addT() {
    onChange({ ...data, testimonials: [...testimonials, { name: "Client Name", role: "Role", company: "Company", avatar: "", rating: 5, text: "Testimonial text...", project: "Project", duration: "4 weeks" }] });
  }
  function removeT(i: number) {
    onChange({ ...data, testimonials: testimonials.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="max-w-3xl space-y-3">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle title="Testimonials" />
        <button onClick={addT} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-blue/15 text-accent-blue text-sm hover:bg-accent-blue/25 transition-colors flex-shrink-0">
          <Plus size={14} /> Add
        </button>
      </div>
      {testimonials.map((t, i) => (
        <Card key={i}>
          <div className="flex justify-between items-start gap-2 mb-4">
            <div className="text-sm font-semibold text-text-primary">{t.name} — {t.company}</div>
            <button onClick={() => removeT(i)} className="text-red-400/50 hover:text-red-400 p-1 rounded flex-shrink-0"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name"><Input value={t.name} onChange={(v) => updateT(i, "name", v)} /></Field>
            <Field label="Role"><Input value={t.role} onChange={(v) => updateT(i, "role", v)} /></Field>
            <Field label="Company"><Input value={t.company} onChange={(v) => updateT(i, "company", v)} /></Field>
            <Field label="Project"><Input value={t.project} onChange={(v) => updateT(i, "project", v)} /></Field>
            <div className="sm:col-span-2"><Field label="Testimonial"><Textarea value={t.text} onChange={(v) => updateT(i, "text", v)} rows={4} /></Field></div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ─── FAQ Editor ─── */
function FAQEditor({ data, onChange }: { data: PortfolioDataType; onChange: (d: PortfolioDataType) => void }) {
  const faq = data.faq;
  function updateFAQ(i: number, key: string, val: string) {
    onChange({ ...data, faq: faq.map((f, idx) => (idx === i ? { ...f, [key]: val } : f)) });
  }
  function addFAQ() {
    onChange({ ...data, faq: [...faq, { question: "New Question", answer: "Answer here..." }] });
  }
  function removeFAQ(i: number) {
    onChange({ ...data, faq: faq.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="max-w-3xl space-y-3">
      <div className="flex items-center justify-between mb-5">
        <SectionTitle title="FAQ" subtitle={`${faq.length} questions`} />
        <button onClick={addFAQ} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent-blue/15 text-accent-blue text-sm hover:bg-accent-blue/25 transition-colors flex-shrink-0">
          <Plus size={14} /> Add FAQ
        </button>
      </div>
      {faq.map((f, i) => (
        <Card key={i}>
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 space-y-3 min-w-0">
              <Field label={`Q${i + 1}`}><Input value={f.question} onChange={(v) => updateFAQ(i, "question", v)} /></Field>
              <Field label="Answer"><Textarea value={f.answer} onChange={(v) => updateFAQ(i, "answer", v)} rows={3} /></Field>
            </div>
            <button onClick={() => removeFAQ(i)} className="text-red-400/50 hover:text-red-400 p-1 mt-6 rounded flex-shrink-0"><Trash2 size={14} /></button>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ─── Contacts View ─── */
type ContactEntry = { id: string; name: string; email: string; subject: string; message: string; date: string; read: boolean };
function ContactsView({ contacts }: { contacts: ContactEntry[] }) {
  return (
    <div className="max-w-3xl space-y-3">
      <SectionTitle title="Contact Submissions" subtitle={`${contacts.length} messages received`} />
      {contacts.length === 0 && (
        <Card><p className="text-text-muted text-sm text-center py-8">No contact submissions yet.</p></Card>
      )}
      {contacts.map((c) => (
        <Card key={c.id}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="text-sm font-semibold text-text-primary">{c.name}</div>
              <div className="text-xs text-accent-blue">{c.email}</div>
              {c.subject && <div className="text-xs text-text-muted mt-0.5">Re: {c.subject}</div>}
            </div>
            <div className="text-xs text-text-muted flex-shrink-0">{new Date(c.date).toLocaleDateString()}</div>
          </div>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">{c.message}</p>
        </Card>
      ))}
    </div>
  );
}

/* ─── Settings ─── */
function SettingsPanel() {
  return (
    <div className="max-w-2xl space-y-5">
      <SectionTitle title="Settings" subtitle="Admin panel configuration" />
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Password Protection</h3>
        <p className="text-sm text-text-secondary mb-4">Set the admin password via the <code className="text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded text-xs">ADMIN_PASSWORD</code> environment variable in <code className="text-accent-blue bg-accent-blue/10 px-1.5 py-0.5 rounded text-xs">.env.local</code>.</p>
        <div className="bg-white/4 rounded-xl p-3 sm:p-4 border border-white/6 overflow-x-auto">
          <code className="text-sm text-accent-cyan font-mono whitespace-nowrap">ADMIN_PASSWORD=your_secure_password</code>
        </div>
        <p className="text-xs text-text-muted mt-3">Default: <code className="text-accent-blue font-mono">awesh2025admin</code></p>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-3">How to Publish Changes</h3>
        <ol className="space-y-2 text-sm text-text-secondary">
          <li className="flex gap-3"><span className="text-accent-blue font-bold flex-shrink-0">1.</span> Edit content in any tab above</li>
          <li className="flex gap-3"><span className="text-accent-blue font-bold flex-shrink-0">2.</span> Click <strong className="text-text-primary">Save Changes</strong> — saves to <code className="text-accent-cyan text-xs font-mono">data/cms-data.json</code></li>
          <li className="flex gap-3"><span className="text-accent-blue font-bold flex-shrink-0">3.</span> Redeploy to publish changes live</li>
        </ol>
      </Card>
    </div>
  );
}
