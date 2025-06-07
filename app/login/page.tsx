'use client'
import { useRef, useState } from "react";
import { login } from "../pg/action";

export default function LoginPage() {
    const modalRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    // Show modal using Bootstrap JS API
    const openModal = () => {
        setShow(true);
        setTimeout(() => {
          if (modalRef.current) {
            // @ts-ignore
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
          }
        }, 100); // small delay to ensure DOM update
      };
    
      // Hide modal after login
      const closeModal = () => {
        setShow(false);
      };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Success: Redirect to home or dashboard
  };

  return (
    <>
      <button
        className="btn fw-bold"
        style={{ background: "#857fff", color: "#fff", borderRadius: 12, padding: "0.75rem 2rem", fontSize: "1.1rem" }}
        onClick={openModal}
      >
        Sign In
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        tabIndex={-1}
        ref={modalRef}
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        style={{ display: show ? "block" : "none", background: "rgba(30, 20, 70, 0.15)" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: 28, overflow: "hidden" }}>
            <div className="row g-0">
              {/* Left: Image */}
              <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center" style={{ background: "#857fff" }}>
                <div className="w-100 text-center p-4">
                  <img
                    src="/loginui.jpg"
                    alt="Login visual"
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 20,
                      marginBottom: 18,
                      boxShadow: "0 8px 30px 0 rgba(0,0,0,0.10)",
                      border: "4px solid #fff",
                    }}
                  />
                  <h2 className="text-white fw-bold mb-1" style={{ fontSize: "1.3rem" }}>
                    Listen to your top musics
                  </h2>
                  <p className="text-white fw-semibold mb-0" style={{ fontSize: "1rem", letterSpacing: 1 }}>FOR FREE</p>
                </div>
              </div>
              {/* Right: Form */}
              <div className="col-12 col-lg-6 bg-white d-flex flex-column justify-content-center p-5">
                <div style={{ maxWidth: 330, width: "100%" }} className="mx-auto">
                  <h2 className="fw-bold text-center mb-4" style={{ color: "#857fff" }}>Sign In</h2>
                  <form autoComplete="on" onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#857fff" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-3 px-3 py-2"
                        id="email"
                        placeholder="your@email.com"
                        value={email}
                        autoComplete="username"
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold" style={{ color: "#857fff" }}>
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-3 px-3 py-2"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    {errorMsg && (
                      <div className="alert alert-danger text-center py-2">
                        {errorMsg}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn w-100 fw-bold rounded-3"
                      style={{
                        background: "#857fff",
                        color: "#fff",
                        fontSize: "1.05rem",
                        padding: "0.7rem 0",
                        marginTop: 8,
                        marginBottom: 12,
                        boxShadow: "0 4px 12px 0 #857fff22",
                        border: "none",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Signing in…" : "Sign In"}
                    </button>
                  </form>
                  <div className="d-flex align-items-center mb-3">
                    <hr className="flex-grow-1 border" />
                    <span className="mx-2 text-secondary" style={{ fontWeight: 600, fontSize: 12 }}>OR</span>
                    <hr className="flex-grow-1 border" />
                  </div>
                  <div className="d-flex flex-column gap-2 mb-3">
                    <button className="btn btn-light d-flex align-items-center justify-content-center gap-2 border rounded-3 py-2">
                      <img src="/google.svg" alt="" width={18} height={18} /> Sign in with Google
                    </button>
                    <button className="btn btn-light d-flex align-items-center justify-content-center gap-2 border rounded-3 py-2">
                      <img src="/facebook.svg" alt="" width={18} height={18} /> Sign in with Facebook
                    </button>
                  </div>
                  <p className="text-center mt-2 mb-0 text-secondary">
                    Don't have an account? <a href="/signup" style={{ color: "#857fff", fontWeight: 600, textDecoration: "none" }}>Sign up</a>
                  </p>
                </div>
              </div>
            </div>
            {/* Close button */}
            <button
              type="button"
              className="btn-close position-absolute"
              aria-label="Close"
              style={{ top: 18, right: 20, zIndex: 10 }}
              data-bs-dismiss="modal"
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
