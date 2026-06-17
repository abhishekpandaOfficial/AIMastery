import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { pdfs, type PDFItem } from "@/lib/mock-data";
import { Upload, Sparkles, BookOpen, Eye, Layers, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/pdfs")({
  head: () => ({ meta: [{ title: "PDFs · AIMastery" }] }),
  component: PDFsPage,
});

function PDFsPage() {
  const [selectedPdf, setSelectedPdf] = useState<PDFItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewPdf = (pdf: PDFItem) => {
    setSelectedPdf(pdf);
    setIsViewerOpen(true);
  };

  // Grouping logic:
  // Main textbooks are those with no parentId.
  const mainPdfs = pdfs.filter((p) => !p.parentId);

  // Get children for a parent PDF
  const getChapters = (parentId: string) => {
    return pdfs
      .filter((p) => p.parentId === parentId)
      .sort((a, b) => (a.chapter || 0) - (b.chapter || 0));
  };

  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="PDF Resources"
          description="Access textbook curriculum materials, chapter lecture notes, and study slides. AI highlights core topics and generates dynamic study decks."
          actions={
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-white text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer">
              <Upload className="h-3.5 w-3.5" /> Upload PDF
            </button>
          }
        />

        {/* Upload Dropzone */}
        <div className="rounded-xl glass-strong p-8 mb-8 border-2 border-dashed border-border/60 text-center hover:border-violet-500/40 transition-colors">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-bounce-slow" />
          <div className="text-sm font-medium">Drop new PDFs here to summarize</div>
          <div className="text-xs text-muted-foreground mt-1">Books, research papers, slides — max 100MB each</div>
        </div>

        {/* Textbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {mainPdfs.map((textbook) => {
            const chapters = getChapters(textbook.id);
            return (
              <div
                key={textbook.id}
                className="group rounded-xl glass p-6 hover:bg-muted/10 hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between border border-border/40 shadow-lg hover:shadow-violet-500/5 relative overflow-hidden"
              >
                <div>
                  {/* Icon and metadata */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-border/60 grid place-items-center text-3xl group-hover:scale-105 transition-transform duration-300">
                      {textbook.thumb}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                      {textbook.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Stats */}
                  <h3 className="text-lg font-semibold tracking-tight text-foreground/90 group-hover:text-cyan-300 transition-colors duration-200">
                    {textbook.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    {textbook.pages} pages · {textbook.size} · Compiled by AI Architects
                  </p>

                  {/* Main Action Button */}
                  <button
                    onClick={() => handleViewPdf(textbook)}
                    className="w-full py-2.5 px-4 rounded-lg bg-secondary/80 hover:bg-violet-600 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5 border border-border/40 hover:border-transparent cursor-pointer shadow-sm mb-4"
                  >
                    <BookOpen className="h-3.5 w-3.5" /> Read Textbook
                  </button>

                  {/* Chapters List */}
                  {chapters.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/30 space-y-2">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5 mb-2">
                        <Layers className="h-3.5 w-3.5 text-cyan-400" /> Lecture Notes & Modules
                      </div>
                      <div className="space-y-2">
                        {chapters.map((chapter) => (
                          <div
                            key={chapter.id}
                            onClick={() => handleViewPdf(chapter)}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 hover:bg-muted/50 transition-colors border border-border/20 cursor-pointer group/chapter"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-base shrink-0">{chapter.thumb}</span>
                              <span className="text-xs font-medium truncate text-foreground/80 group-hover/chapter:text-cyan-300 transition-colors">
                                {chapter.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 pl-3">
                              <span className="text-[10px] text-muted-foreground">{chapter.pages} pages</span>
                              <Eye className="h-3.5 w-3.5 text-muted-foreground group-hover/chapter:text-cyan-300 transition-colors" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-4 mt-6 border-t border-border/20 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1 text-cyan-400 font-medium">
                    <Sparkles className="h-3 w-3" /> Auto Summarizer Active
                  </div>
                  <div>Uploaded: {textbook.uploadedAt}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PDF Viewer Dialog */}
        <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
          <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-6 bg-background/95 border-border/80 glass-strong shadow-2xl overflow-hidden rounded-xl">
            {selectedPdf && (
              <>
                <DialogHeader className="pb-4 border-b border-border/30 flex flex-row items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-2xl">{selectedPdf.thumb}</span>
                      <DialogTitle className="text-lg font-bold tracking-tight text-foreground truncate">
                        {selectedPdf.title}
                      </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-muted-foreground flex items-center gap-3">
                      <span>Pages: {selectedPdf.pages}</span>
                      <span>•</span>
                      <span>Size: {selectedPdf.size}</span>
                      <span>•</span>
                      <span className="text-cyan-400 font-medium">{selectedPdf.tags.join(", ")}</span>
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pr-8">
                    {selectedPdf.filename && (
                      <a
                        href={`/Docs/${selectedPdf.filename}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Full Tab
                      </a>
                    )}
                  </div>
                </DialogHeader>

                {/* IFrame Container */}
                <div className="flex-1 min-h-0 w-full relative bg-black/40 rounded-lg overflow-hidden border border-border/30 mt-4">
                  {selectedPdf.filename ? (
                    <iframe
                      src={`/Docs/${selectedPdf.filename}#toolbar=1`}
                      title={selectedPdf.title}
                      className="w-full h-full border-0 bg-transparent"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-4">
                      <BookOpen className="h-12 w-12 mb-3 text-muted-foreground/60 animate-pulse" />
                      <p className="text-sm font-medium">Unable to locate PDF file</p>
                      <p className="text-xs mt-1">Please confirm the asset is present in the public/Docs path.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </PageShell>
    </AppShell>
  );
}
