import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCravings from './FeaturedCravings';
import CategoryExplorer from './CategoryExplorer';
import SignatureCollection from './SignatureCollection';
import FinalCTA from './FinalCTA';

export default function HomePage({ onNavigate, onSelectCategory }) {
  return (
    <div className="page-transition">
      {/* 1. Hero Section matching the fashion editorial reference with grounded drumstick & dynamic floating elements */}
      <HeroSection
        onExploreClick={() => onNavigate('menu')}
        onStoryClick={() => onNavigate('about')}
      />

      {/* 2. Section A: Featured Cravings (The Art of a Good Craving) */}
      <FeaturedCravings onExploreMenu={() => onNavigate('menu')} />

      {/* 3. Section B: Category Explorer (The 4 Signature Corridors) */}
      <CategoryExplorer
        onSelectCategory={catId => {
          if (onSelectCategory) {
            onSelectCategory(catId);
          } else {
            onNavigate('menu');
          }
        }}
      />

      {/* 4. Section C: The Signature Collection (Not Just Food. A Whole Mood.) */}
      <SignatureCollection />

      {/* 5. Section F: Final CTA (Your Next Craving Is Waiting) */}
      <FinalCTA onExploreMenu={() => onNavigate('menu')} />
    </div>
  );
}
