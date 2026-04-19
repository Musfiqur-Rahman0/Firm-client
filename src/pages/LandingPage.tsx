import React, { useEffect, useState } from "react";
import "../landing.css";

const LandingPage: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHidingToast, setIsHidingToast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsHidingToast(false);
    setTimeout(() => {
      setIsHidingToast(true);
      setTimeout(() => setToastMessage(null), 300); // Match fadeOut animation duration
    }, 3000);
  };

  return (
    <div className="layout" style={{ display: "block", minHeight: "100vh" }}>
      {/* Navbar */}

      <main>
        {/* Section 1: Hero */}
        <section className="section hero">
          <div className="container grid-2" style={{ alignItems: "center" }}>
            <div className="hero-content animate-on-scroll">
              <span className="text-overline">Reclaiming the Concrete</span>
              <h1>Grow Your Own Food in the City</h1>
              <p className="text-lead">
                Join the movement of urban cultivators. Rent a modular garden
                space, track your harvest in real-time, or shop fresh produce
                from our hyper-local marketplace.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-secondary">
                  Explore Marketplace
                </button>
              </div>
            </div>
            <div
              className="hero-image-wrap animate-on-scroll"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="hero-main-img">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw5ApUzdUvv6fU8_C0QXggdLgk6oXWVjEcp9JcF8rmIFgLwRLMajdiJ1TBmYQ-NhcemoZbd7b2CqPSN6QGTo2xlWxu1-vaFOzH5z3AbW1BKpS9U5m2X9Xzhj33iK6WhNtkXaqEx84P1n9G3Fl-ZiKIw3O4bF8LJPcdwYscRHWQ2F0g3_FcBqD9Xeb2ZlCaO07vlweA54NSPzZQDRvOBge93VIveF5BWhuGZ0MMQbu2DT-X9XLrzjJrhor4pMqrzmXwzOneFAD7uMw"
                  alt="Lush vertical hydroponic garden"
                />
              </div>
              <div className="hero-sub-img">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9pqhBfzlqHcxnTtfUxDOmHRZPgTXfq0WfmXcL7wDQ_gqLnjzj2UWkCbmSToH5EiJGHty64PH-h5C4asdN7kRCglWeXWBBqF8QRWXxdRAcs8ueFZMqBze2OG5QqaT7UBM2yIJqt9g6Gi3ubVXW3-WH-A7zx8UMkGPypmJRoPscKu1w_Aio9PWrEAIpQ5vG-G1k4UHoBuSNhZhe0bpmRhDs_Amj-JzbroYaeJE43kqP6TWKDHpZFjgMK_VPIfuBTFcFHWUKa_ihTlY"
                  alt="Macro close-up of fresh green organic kale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Features Grid (Bento Style) */}
        <section className="section">
          <div className="container">
            <div className="features-grid animate-on-scroll">
              <div className="feature-card fc-1">
                <span className="material-symbols-outlined icon">
                  potted_plant
                </span>
                <h3>Garden Space Rental</h3>
                <p>
                  Access premium rooftop and modular balcony plots equipped with
                  automated irrigation systems. Start your urban farm journey
                  without the heavy lifting.
                </p>
              </div>
              <div className="feature-card fc-2">
                <span className="material-symbols-outlined icon">
                  shopping_basket
                </span>
                <h3>Organic Marketplace</h3>
                <p>
                  Buy and sell surplus harvests directly with your neighbors.
                  Pure, local, and 100% transparent.
                </p>
              </div>
              <div className="feature-card fc-3">
                <span className="material-symbols-outlined icon">
                  monitoring
                </span>
                <h3>Real-time Tracking</h3>
                <p>
                  Monitor soil health, hydration levels, and growth milestones
                  directly from your dashboard.
                </p>
              </div>
              <div className="feature-card fc-4">
                <div className="fc-4-content">
                  <span className="material-symbols-outlined icon">groups</span>
                  <h3>Community Forum</h3>
                  <p>
                    Exchange tips with experienced urban farmers, participate in
                    workshops, and grow together.
                  </p>
                </div>
              </div>
              <div className="fc-img">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR76B0XDd8LZUD0TMXfkOz2Bf1jnqT2nrRrm32yTx4j3hybZvLN756gBq7FrFGJeCFLgWC7nsQF8Jws9ArcZcKw9mhspBFOpfxiDrlVaf8cc-u5UVq1JJQ8d1qpnTFKjwy57OkvcT51bt2UbraGTAPAxC3vX4dUfI092-tJGlJ3RDY7Bfa90BXiYLUUXwgPmOz3FlUOBGE-bNjmuyFjTKMttFynIVSJC_mofA5qr2kIk4n-Vf6mpfYDzpUBMgzD63r7yqGZUWYyeM"
                  alt="Community garden on a modern urban rooftop"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section className="section bg-alt animate-on-scroll">
          <div className="container">
            <div className="text-center">
              <h2>How Your City Garden Grows</h2>
              <div className="title-separator"></div>
            </div>
            <div className="grid-3">
              <div className="step-card">
                <div className="step-num">1</div>
                <h4>Sign Up</h4>
                <p>
                  Create your profile and tell us about your gardening goals and
                  available space.
                </p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h4>Rent or Buy</h4>
                <p>
                  Choose your modular plot or browse the marketplace for fresh
                  seasonal produce.
                </p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h4>Track & Engage</h4>
                <p>
                  Watch your plants grow via IoT sensors and share your progress
                  with the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Marketplace Preview */}
        <section className="section">
          <div className="container animate-on-scroll">
            <div className="marketplace-header">
              <div>
                <h2>Marketplace Picks</h2>
                <p className="text-lead" style={{ marginBottom: 0 }}>
                  Freshly harvested by your neighbors this morning.
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => showToast("Navigating to marketplace...")}
              >
                View All Products
              </button>
            </div>
            <div className="grid-4">
              {[
                {
                  name: "Heirloom Carrots",
                  price: "$4.50 / bunch",
                  loc: "Downtown Sky Garden • 1.2 mi",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuDsVfrqTPto4teAsnowY1Wbm7bX4s2ZxuWilqxtp7aCv0_ChQqs8m91kYl0yQq0QIHc13vFPx_qmZFUP619a-J8LhHfrrnztcjgWjEp4eoVMYIW9-1rntyaurikuNPi-qRmaOgG-DcWSTXLTHS3kEI5m7Ad6ZGgiGjGDZMb_fXVzklw61htxtlWmAw8VZL3B7qz4v1yRjN5_ovEbC-q_2dVF9MZ_N0p_FJD_BZwA5Imjb32c6ojOl3oYDbyD4x0EVKvWBo6yTmYA",
                },
                {
                  name: "Sweet Genovese Basil",
                  price: "$3.00 / oz",
                  loc: "Westside Balcony • 0.8 mi",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClR9ygB6a98ML6FHRqApO5yztD7xkMCLWUcEf5PieXm2t_4gtQdQksnuAenUY93J7V7C5ZbyeVNqtEANQdE2H_eKa492dj6l7MZBJeuNeb2MpI8eCq8n47bOr42rHxdq4pR3_EZHRTkdzPBnfSvYrNWTAEghJHV3yg7HSUL-W9ZOMA3z6c6Rp2RkujRHoLHnk4UxLgCqn7W1rZgis57AKXycMfFu3HNh6nM5WtC6SFcxABobckrtWneN12_j8PtL9KFNGbaA8Dr50",
                },
                {
                  name: "Ruby Cherry Tomatoes",
                  price: "$6.00 / lb",
                  loc: "Riverside Urban Plot • 2.5 mi",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX1G3xJGqxzRlCVcxPqpJW3-xTNZ6fhGdQybRm86UikcPzKa9h_geCy06Bzn4YeQEXisstCraIVVXsxB5mVc1TJY1sicg9MH_JiJtbFoXarzw-ocJyvQ5F3ou3SraWbHjPp2-t68NE0e28lDmTxesMpjMeyghefzwI7Koz8b7F4M3iuuwI7eeaQwqeDYbHNF1zYBSDv7Vgfbc6LCgiEKP2CPbYTQR3zN7Y9OSH6WtE19q2DsDQSt75lyezFo47aeCpf3F80GIQbek",
                },
                {
                  name: "Peppercorn Radishes",
                  price: "$3.50 / bunch",
                  loc: "Echo Park Gardens • 1.5 mi",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLsKm3C3PhUG3AsEbTtu9gvDFu2trZcznWwzuJ8G5AKfhbzYgaD1znzb6EwmCE0OVIJYmO21Z7tg35JPhd7fdis0ZXhvngy9cdPyfricLLtGCIg5tMKV--_g7jfKnAPbvTTcm23dlLLq7bW5evH9eBC6vO8P8CWlzcOlJciXyxvqYqmlEZCddRil55TaoPkX1iMuud8KRlyzF3HRGsdQxW82ZuWgycGenM2NVkk07KncJtYaLIDjJ__9mfoF7BEIPTtwOMCod9lHE",
                },
              ].map((product, idx) => (
                <div key={idx} className="product-card">
                  <div className="product-img">
                    <img src={product.img} alt={product.name} />
                    <span className="product-badge">Organic Certified</span>
                  </div>
                  <h4>{product.name}</h4>
                  <p className="product-meta">{product.loc}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button
                      className="btn-icon"
                      title="Add to cart"
                      onClick={() => showToast(`Added ${product.name} to cart`)}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Farm Rental Preview */}
        <section className="section bg-darker">
          <div className="container animate-on-scroll">
            <h2 style={{ marginBottom: "48px" }}>Available Garden Plots</h2>
            <div className="grid-3">
              {[
                {
                  name: "Brooklyn Heights Rooftop",
                  price: "$45/mo",
                  status: "4 Available",
                  isDanger: false,
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXUSIw7Dj9PUtOHPvSgl4psFeOBRoA_ICKZfSEj8Ej0q6dOMBdZmFBu5Rci5yZkKAk3FqUSF5lvqy7Dyazju3bgZeD_Bw-8MRC9irLcoeqxdrpTgp_UPeiKJvDKpm1iLlDUrw_mc7JnuhPDGlO8O-TumcMt2UwB08-gqapjr1GbrGFBMxv2Hz_SjkTCf0NoqKcg7Jy_H6MeN1w8_hPJLvwWQxi_SE5_cM4hGP8VeK4I5vAtz5aw85iO9cVfJ-LmK0ixLJjj3dxWUE",
                  f1: { icon: "square_foot", text: "15 sq ft" },
                  f2: { icon: "water_drop", text: "Auto-Irri" },
                },
                {
                  name: "The Green Hub Vertical",
                  price: "$30/mo",
                  status: "12 Available",
                  isDanger: false,
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkra9ksmzSqNNXEh97Vjs7MYASTJaXs6lWrKDa8a2PzisoVde9qALjkoh12yA3ef6Y2CGgaH2mSAZFqziFNBHw-jLjnTwO194DO0foByr92hITsQdN7DdKQfrn2vwXZc6jV3_qkStOQyDVmmQAkUYAGrvFdTBfuM3t7ebN0pZ5HJT_jQkirb88iPeI8bOLpET0TNefWrLs8sYK3Yqz2kiLdIrRB25JboG3XUk_FfDDvqZS_kCAh40Kpe8RNlYj_pe0n7b0ys2AcmU",
                  f1: { icon: "square_foot", text: "8 sq ft" },
                  f2: { icon: "wb_sunny", text: "LED Tech" },
                },
                {
                  name: "Echo Park Balcony Pods",
                  price: "$25/mo",
                  status: "Last Plot!",
                  isDanger: true,
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVF191XjUt1ZAwldAS0Og75JP1MHlwWAhBIGXIfiXzqm5aTJeCuO4kHWsmLhvT4tTTZU8IWvpA-zpcscaT_-1R_qI5yfaEywql5yUFqMpBah0CdnvZg1QKFPzfiAzlbVMfsWGSvCbwoHcTcNhwuClJ_holp7XTLrRm1zU4QIgVmL_0V0yXWWFrVUQYDXSZvkgB5IUFK_lRfeFxQtGl6-UWLX3J10exn8qhwqmFf_vruf8riPSeQVpBWdkxUd23oSxf9vAANf0ABds",
                  f1: { icon: "square_foot", text: "5 sq ft" },
                  f2: { icon: "park", text: "Eco-Soil" },
                },
              ].map((loc, idx) => (
                <div key={idx} className="location-card">
                  <div className="location-img">
                    <img src={loc.img} alt={loc.name} />
                    <div
                      className={`location-badge ${loc.isDanger ? "danger" : ""}`}
                    >
                      {loc.status}
                    </div>
                  </div>
                  <div className="location-body">
                    <div className="location-header">
                      <h4>{loc.name}</h4>
                      <span className="location-price">{loc.price}</span>
                    </div>
                    <div className="location-features">
                      <span className="location-feature">
                        <span className="material-symbols-outlined">
                          {loc.f1.icon}
                        </span>{" "}
                        {loc.f1.text}
                      </span>
                      <span className="location-feature">
                        <span className="material-symbols-outlined">
                          {loc.f2.icon}
                        </span>{" "}
                        {loc.f2.text}
                      </span>
                    </div>
                    <button
                      className="btn btn-outline"
                      style={{ width: "100%", marginTop: "auto" }}
                      onClick={() => showToast(`Reserved ${loc.name}`)}
                    >
                      Reserve Plot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Sustainability */}
        <section className="section">
          <div className="container animate-on-scroll">
            <div className="sustainability-box">
              <div className="sustainability-content">
                <h2>Pioneering a Carbon-Negative Urban Future</h2>
                <p>
                  By reducing food miles to food meters, we help cities breathe.
                  Our vendors use 100% compostable packaging and regenerative
                  farming methods that restore urban biodiversity.
                </p>
                <div className="eco-grid">
                  <div className="eco-item">
                    <span className="material-symbols-outlined">eco</span>{" "}
                    <span>Zero Plastic</span>
                  </div>
                  <div className="eco-item">
                    <span className="material-symbols-outlined">cycle</span>{" "}
                    <span>100% Compost</span>
                  </div>
                  <div className="eco-item">
                    <span className="material-symbols-outlined">
                      solar_power
                    </span>{" "}
                    <span>Solar Powered</span>
                  </div>
                  <div className="eco-item">
                    <span className="material-symbols-outlined">water_lux</span>{" "}
                    <span>Recycled Water</span>
                  </div>
                </div>
              </div>
              <div className="sustainability-img">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPNNgzdxCY7NdIh9I3K0fvnGUIuogJWTf0w1G2D-PB9ep0VNT03QMMFBYK1SCS3UzWu0X7SOUMTcdK1OdAlMWXjdStzRy7G90S8p464NoV5OioaQwF4j3cXtkX_XPqBriHjtWU5btuv7z0Fwm_MBQB1VZBIQ1H-x1rAuAwSWs85Lq024pUkDP8zel9K9gKtWI57wh0BaD09m-H4Tt6_c4kI9ZLl7pDwQNadSJKZDP1wHmr-W22IsRC92s59oYNx2zuF1JCT8IIXSM"
                  alt="Aerial view of a lush green city park"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Community */}
        <section className="section">
          <div className="container animate-on-scroll">
            <div className="text-center" style={{ marginBottom: "80px" }}>
              <h2>Voice of the Ecosystem</h2>
            </div>
            <div className="grid-3">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "I never thought I could grow my own salad while living on the
                  14th floor. FloraUrban changed my relationship with food
                  forever."
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-6EgjS8KyU3fKWz7Xz1svGZ0xFUSyouExuWpBOx96zNcxHRK-WBtAbt6APzwzstO2TuoBlXgjKrRduCJiukbX6gNLWUFhUe1VoctQ5G2ZOeagKn3h0YpY1qHi5FeAfrQJnVq2doIylAEYGZ6n3z-fX5rhRWFuvUZpFHCkJaGASQ0olUhcQ68H9MptqontkY1BoznLMZFNeBNCSR5UMmw-6WrJ9afTMjcdD0uDLuCVWfC1CpnUqPiMG1E98aRLN6jt9Dn4FPfTQ_Q"
                      alt="Sarah Jenkins"
                    />
                  </div>
                  <div>
                    <div className="testimonial-name">Sarah Jenkins</div>
                    <div className="testimonial-role">Rooftop Gardener</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "The marketplace is amazing. I swap my excess tomatoes for
                  local honey. It feels like a real village inside the big
                  city."
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCisQ1KSWvhcnrrBLhXBIF8u-Uu9JGzVjhOaqnSBvWEk1HwOHZkEOh4nvtTWJL_ZwGme9btLmor7gvfMpxCf_iOsaLPAVehlTHQWW3uFYSQhShImJX0ZcYuj7CLMsxJgFqKPBhL98AXGMa2NDmqlK791fILfUnzg_GN5rgPIDb6BJMLsDi6b2xXGAtH269nYsv5BxkP9AfhvSW6A8BUfI2IZlJILCEicyOv-HaBVEO0TP1CXPfaLRuPvwE_gtPF82QYdtr6_BqRyj4"
                      alt="Mark Thompson"
                    />
                  </div>
                  <div>
                    <div className="testimonial-name">Mark Thompson</div>
                    <div className="testimonial-role">Community Seller</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "The real-time tracking is a game changer for a beginner like
                  me. I get notifications exactly when my plants need a drink."
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrKluE_ivZ_pDFtTF2vL2HyegUbQDqv0YAQvIgm-eF30oeYFMw0A2rzRRK8_y-AHZmK07WWGvn36c8eSXdMyt6R4JXBHlouqjSuRQkSX_UHDvm5FY4ov6-qC53DTzn06JQwegTAsLBKNspF6TzvbI9LSA6iUkMu6pudXKZcJUZJiG4cd94puFC_hol9CIJee7Pk4x7rGn2dyfjNuPAhDlsLLnZq8t59d02SJT2I2lm0c9-N3xuHaJcvKYTFsNyqQIkH05lm6j-FmU"
                      alt="Elena Rodriguez"
                    />
                  </div>
                  <div>
                    <div className="testimonial-name">Elena Rodriguez</div>
                    <div className="testimonial-role">Smart Farmer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Final CTA */}
        <section className="cta-section animate-on-scroll">
          <div className="container">
            <div className="cta-content">
              <h2>Start Your Urban Farming Journey Today</h2>
              <p>
                Join thousands of city dwellers who are cultivating a greener,
                healthier future. No green thumb required.
              </p>
              <button className="btn btn-primary btn-large">Join Now</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">FloraUrban</div>
            <p>
              © 2024 FloraUrban Ecosystems. Cultivating the wild in every city.
            </p>
          </div>
          <div>
            <h5>Resources</h5>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Sustainability Report</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#">Press Kit</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Newsletter</h5>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Subscribed to newsletter!");
              }}
            >
              <input type="email" placeholder="Email address" required />
              <button type="submit">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`toast success ${isHidingToast ? "hiding" : ""}`}>
          <span className="material-symbols-outlined">check_circle</span>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
