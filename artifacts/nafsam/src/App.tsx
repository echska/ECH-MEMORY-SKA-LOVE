import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { useLang } from "@/hooks/useLang";
import Rain from "@/components/Rain";
import Navbar from "@/components/Navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Moments from "@/pages/Moments";
import Photos from "@/pages/Photos";
import Songs from "@/pages/Songs";
import Videos from "@/pages/Videos";
import Writings from "@/pages/Writings";
import Stats from "@/pages/Stats";
import Guestbook from "@/pages/Guestbook";
import { startSession, endSession } from "@/lib/analytics";
import { safeGet } from "@/lib/safeStorage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authed = safeGet("nafsam_auth") === "1";
  if (!authed) return <Redirect to="/" />;
  return <>{children}</>;
}

function AppContent() {
  const { lang, setLang, t } = useLang();
  const [authed, setAuthed] = useState(
    () => safeGet("nafsam_auth") === "1"
  );
  const [location] = useLocation();

  useEffect(() => {
    const check = () => setAuthed(safeGet("nafsam_auth") === "1");
    window.addEventListener("storage", check);
    check();
    return () => window.removeEventListener("storage", check);
  }, [location]);

  useEffect(() => {
    if (!authed) return;
    startSession();
    return () => endSession();
  }, [authed]);

  return (
    <div className="app-shell">
      <Rain />
      {authed && <Navbar t={t} />}
      <LanguageSwitcher lang={lang} setLang={setLang} mini />
      <main>
        <Switch>
          <Route path="/">
            <Login t={t} onAuth={() => setAuthed(true)} />
          </Route>
          <Route path="/home">
            <ProtectedRoute><Home t={t} /></ProtectedRoute>
          </Route>
          <Route path="/moments">
            <ProtectedRoute><Moments t={t} /></ProtectedRoute>
          </Route>
          <Route path="/photos">
            <ProtectedRoute><Photos t={t} lang={lang} /></ProtectedRoute>
          </Route>
          <Route path="/songs">
            <ProtectedRoute><Songs t={t} /></ProtectedRoute>
          </Route>
          <Route path="/videos">
            <ProtectedRoute><Videos t={t} /></ProtectedRoute>
          </Route>
          <Route path="/writings">
            <ProtectedRoute><Writings t={t} /></ProtectedRoute>
          </Route>
          <Route path="/stats">
            <ProtectedRoute><Stats t={t} /></ProtectedRoute>
          </Route>
          <Route path="/guestbook">
            <ProtectedRoute><Guestbook t={t} /></ProtectedRoute>
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppContent />
    </WouterRouter>
  );
}

export default App;
