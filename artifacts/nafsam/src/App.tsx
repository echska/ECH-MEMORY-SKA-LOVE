import { Switch, Route, Router as WouterRouter } from "wouter";
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

function AppContent() {
  const { lang, setLang, t } = useLang();

  return (
    <div className="app-shell">
      <Rain />
      <Navbar t={t} />
      <LanguageSwitcher lang={lang} setLang={setLang} mini />
      <main>
        <Switch>
          <Route path="/">
            <Home t={t} />
          </Route>
          <Route path="/login">
            <Login t={t} />
          </Route>
          <Route path="/moments">
            <Moments t={t} />
          </Route>
          <Route path="/photos">
            <Photos t={t} />
          </Route>
          <Route path="/songs">
            <Songs t={t} />
          </Route>
          <Route path="/videos">
            <Videos t={t} />
          </Route>
          <Route path="/writings">
            <Writings t={t} />
          </Route>
          <Route>
            <Home t={t} />
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
