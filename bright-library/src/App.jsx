import { useState } from "react";
import "./App.css";

/* ---------- DATA (rendered with map()) ---------- */
const navLinks = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Services", id: "services" },
  { label: "Events", id: "events" },
  { label: "Featured Books", id: "books" },
  { label: "Contact Us", id: "contact" },
];

const services = [
  { icon: "📚", title: "Book Borrowing & Returning", text: "Borrow up to five books at a time and return them at the front desk." },
  { icon: "💻", title: "Internet & Computer Access", text: "Free computers and Wi-Fi for research, homework and job applications." },
  { icon: "🪑", title: "Reading & Study Spaces", text: "Quiet rooms and group tables for students and readers of all ages." },
  { icon: "🎓", title: "Workshops & Literacy Programmes", text: "Weekly classes that help children and adults build reading and writing skills." },
];

const events = [
  { title: "Reading Competition", date: "Saturday, 15 November 2026", text: "Students from local schools compete to read and summarise books. Prizes for the top three readers." },
  { title: "Children's Storytelling Session", date: "Saturday, 22 November 2026", text: "Stories, songs and drawing for children aged 4 to 10. Parents are welcome to stay." },
  { title: "Community Literacy Workshop", date: "Saturday, 29 November 2026", text: "A friendly workshop for adults who want to improve their reading and writing." },
];

const books = [
  { title: "Things Fall Apart", author: "Chinua Achebe", text: "A classic African novel about a proud village leader and the arrival of colonial rule.", color: "#b5532f" },
  { title: "Born a Crime", author: "Trevor Noah", text: "Funny and moving stories of growing up in South Africa during and after apartheid.", color: "#1f6f78" },
  { title: "The Alchemist", author: "Paulo Coelho", text: "A shepherd boy follows his dream across the desert in search of treasure and purpose.", color: "#8a6d1d" },
];

/* ---------- REUSABLE COMPONENTS ---------- */
function Header() {
  return (
    <header className="site-header">
      <h1>Bright Future Library</h1>
      <p className="mission">
        Our mission is to promote reading, support students and give every
        resident free access to learning resources.
      </p>
    </header>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar" aria-label="Main navigation">
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        ☰ Menu
      </button>
      <ul className={open ? "nav-list show" : "nav-list"}>
        {navLinks.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <article className="card service-card">
      <span className="icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function EventCard({ title, date, text }) {
  return (
    <article className="card event-card">
      <h3>{title}</h3>
      <p className="event-date">{date}</p>
      <p>{text}</p>
    </article>
  );
}

function BookCard({ title, author, text, color }) {
  return (
    <article className="card book-card">
      <div className="book-cover" style={{ background: color }} aria-hidden="true">
        <span>{title}</span>
      </div>
      <h3>{title}</h3>
      <p className="author">by {author}</p>
      <p>{text}</p>
    </article>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ fullName: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address, e.g. name@example.com.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSuccess("Thank you! Your message has been sent successfully.");
      setForm({ fullName: "", email: "", message: "" });
    } else {
      setSuccess("");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="fullName">Full Name</label>
      <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
      {errors.fullName && <p className="error" role="alert">{errors.fullName}</p>}

      <label htmlFor="email">Email Address</label>
      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
      {errors.email && <p className="error" role="alert">{errors.email}</p>}

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} />
      {errors.message && <p className="error" role="alert">{errors.message}</p>}

      <button type="submit" className="btn">Send Message</button>
      {success && <p className="success" role="status">{success}</p>}
    </form>
  );
}

/* ---------- MAIN APP ---------- */
export default function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <section id="home" className="section intro">
          <h2>Welcome to Bright Future Library</h2>
          <p>
            Bright Future Library is a new community library built for
            everyone in our town. We offer books, computers, quiet places to
            study and programmes that help people learn. A library gives
            every child, student and adult an equal chance to read, learn and
            grow, which makes our whole community stronger.
          </p>
        </section>

        <section id="about" className="section alt">
          <h2>About Us</h2>
          <p>
            We opened recently to bring education closer to residents. Our
            friendly team helps visitors find books, use computers and join
            reading activities, all free of charge.
          </p>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <div className="grid">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        <section id="events" className="section alt">
          <h2>Upcoming Events</h2>
          <div className="grid">
            {events.map((ev) => (
              <EventCard key={ev.title} {...ev} />
            ))}
          </div>
        </section>

        <section id="books" className="section">
          <h2>Featured Books</h2>
          <div className="grid">
            {books.map((b) => (
              <BookCard key={b.title} {...b} />
            ))}
          </div>
        </section>

        <section id="contact" className="section alt">
          <h2>Contact Us</h2>
          <div className="contact-wrap">
            <address className="contact-info">
              <p><strong>Address:</strong> 12 Reading Street, Kigali, Rwanda</p>
              <p><strong>Telephone:</strong> +250 788 000 000</p>
              <p><strong>Email:</strong> info@brightfuturelibrary.org</p>
              <p><strong>Opening hours:</strong> Mon–Sat, 8:00 AM – 6:00 PM</p>
            </address>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Bright Future Library. All rights reserved.</p>
      </footer>
    </>
  );
}
