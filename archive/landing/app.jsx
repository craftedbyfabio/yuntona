// Bootstraps the landing page. Split out of index.html because the site CSP
// blocks inline <script> blocks.

function App() {
  return (
    <div>
      <TopNav/>
      <Hero/>
      <CoverageMatrix/>
      <ThreeWaysIn/>
      <Positioning/>
      <Curator/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
