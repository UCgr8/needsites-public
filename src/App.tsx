import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import { PageTransition } from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import Bundles from './components/Bundles';
import BundlePage from './components/BundlePage';
import DomainsExplorer from './components/DomainsExplorer';
import Contact from './components/Contact';
import FAQs from './components/FAQs';
import Login from './components/Login';
import DomainPage from './components/DomainPage';
import About from './components/About';
import Info from './components/Info';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './pages/NotFound';
import Health from './pages/Health';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider delayDuration={200}>
          <Toaster />
          <Sonner />
          <ErrorBoundary>
            <Router>
              <ScrollToTop />
              <Layout>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/bundles" element={<Bundles />} />
                    <Route path="/bundle/:slug" element={<BundlePage />} />
                    <Route path="/domains" element={<DomainsExplorer />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/domain/:name" element={<DomainPage />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </Layout>
            </Router>
          </ErrorBoundary>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
