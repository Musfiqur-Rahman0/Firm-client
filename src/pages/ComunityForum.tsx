import React, { useEffect, useState, useRef } from "react";
// import { communityApi } from '../services/api';
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { demoPosts } from "../../public/demoData/data";
import { communityApi } from "../api/services/apis";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const AVATAR_COLORS = ["#7A9E7E", "#8B6914", "#C2614A", "#5C7E61", "#3D6B3F"];

function Avatar({ name, size = 38 }: { name: string; size?: number }) {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  const color =
    AVATAR_COLORS[name?.charCodeAt(0) % AVATAR_COLORS.length] ||
    AVATAR_COLORS[0];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 600,
        color: "white",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export default function CommunityForum() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const { user } = React.useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const load = async () => {
    setLoading(true);
    // setTimeout(() => {
    //   const start = (page - 1) * 10;
    //   const paginated = demoPosts.slice(start, start + 10);

    //   setPosts(paginated);
    //   setTotal(demoPosts.length);
    //   setLoading(false);
    // }, 500);
    try {
      const data = await communityApi.posts(page);
      setPosts(data?.data || data?.posts || data || []);
      setTotal(data?.total || 0);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both title and content");
      return;
    }

    setPosting(true);
    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      await communityApi.createPost({
        title: title.trim(),
        postContent: content.trim(),
        tags: tagsArray,
      });

      setTitle("");
      setContent("");
      setTags("");
      toast.success("Post shared with the community! 🌿");
      setPage(1);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to post");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    if (!confirm("Delete this post?")) return;
    try {
      await communityApi.deletePost(id);
      toast.success("Post deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = search
    ? posts.filter(
        (p) =>
          p.postContent?.toLowerCase().includes(search.toLowerCase()) ||
          p.userId?.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : posts;

  const totalPages = Math.ceil(total / 10);

  const TIPS = [
    "🌱 Tip: Water your plants early morning",
    "☀ Best sunlight: 6-8 hours daily for most vegetables",
    "🪴 Composting enriches soil naturally",
    "🌧 Rainwater is best for plants",
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Community Forum 💬</h1>
        <p>Share tips, ask questions, and learn from fellow urban farmers</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          {/* Compose */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Avatar name={user?.name || "User"} />
              <form onSubmit={handlePost} style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    fontSize: 14,
                    padding: "8px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                <textarea
                  ref={textareaRef}
                  rows={3}
                  placeholder="Share a farming tip, ask a question, or start a discussion..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ resize: "none", marginBottom: 10, fontSize: 14 }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = t.scrollHeight + "px";
                  }}
                />
                <input
                  type="text"
                  placeholder="Tags (comma-separated: organic, composting, etc.)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    fontSize: 14,
                    padding: "8px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {content.length > 0
                      ? `${content.length} characters`
                      : "Be helpful and kind 🌿"}
                  </span>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={posting || !title.trim() || !content.trim()}
                  >
                    {posting ? "Posting..." : "Share Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Search */}
          <div className="filter-row" style={{ marginBottom: 16 }}>
            <div className="search-bar" style={{ flex: 1 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="loading-screen">
              <div className="spinner" style={{ width: 28, height: 28 }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <h3>{search ? "No matching posts" : "No posts yet"}</h3>
              <p>
                {search
                  ? "Try different keywords"
                  : "Be the first to share something!"}
              </p>
            </div>
          ) : (
            filtered.map((post, i) => (
              <div className="post-card" key={post.id || i}>
                <div className="post-header">
                  <Avatar
                    name={post.userId?.name || post.authorName || "Farmer"}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="post-author">
                      {post.userId?.name || post.authorName || "Urban Farmer"}
                    </div>
                    <div className="post-date">
                      {timeAgo(post.postDate || post.createdAt)}
                    </div>
                  </div>
                  <span className="badge badge-sage" style={{ fontSize: 11 }}>
                    {post.userId?.role || "Member"}
                  </span>
                </div>
                <div className="post-content">{post.postContent}</div>
                <div className="post-actions">
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: 0,
                    }}
                  >
                    👍 Helpful
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: 0,
                    }}
                  >
                    💬 Reply
                  </button>
                  {(user?.id === post.userId?.id ||
                    user?.id === post.userId ||
                    user?.role === "ADMIN") && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13,
                        color: "var(--terracotta)",
                        padding: 0,
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {!search && totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) < 3)
                .map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${p === page ? "active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <h4 style={{ marginBottom: 14, fontSize: "1rem" }}>
              Community Stats
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Total Posts", value: total },
                { label: "Active Members", value: "—" },
                {
                  label: "Your Posts",
                  value: posts.filter(
                    (p) => p.userId?.id === user?.id || p.userId === user?.id,
                  ).length,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                  <span style={{ fontWeight: 600, color: "var(--forest)" }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 style={{ marginBottom: 14, fontSize: "1rem" }}>Farming Tips</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TIPS.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    padding: "8px 10px",
                    background: "var(--cream)",
                    borderRadius: "var(--radius-sm)",
                    lineHeight: 1.5,
                  }}
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
