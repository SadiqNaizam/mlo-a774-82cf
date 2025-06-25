import React, { useState, useCallback } from 'react';

// Layout Components
import MainAppLayout from '../components/layout/MainAppLayout';
import Footer from '../components/layout/Footer';

// UI Components
import { Button } from '@/components/ui/button';

// Organism Components
import SplashScreen from '../components/SplashScreen/SplashScreen';
import FeatureSelection from '../components/FeatureSelection/FeatureSelection';
import AccountOverview from '../components/AccountOverview/AccountOverview';
import PaymentForm from '../components/PaymentForm/PaymentForm';
import TransactionStatus from '../components/TransactionStatus/TransactionStatus';
import UserSettings from '../components/UserSettings/UserSettings';

// Icons
import { Bell, User } from 'lucide-react';

// Type definitions
const screenIds = [
  'splash',
  'feature-selection',
  'account-overview',
  'payment-form',
  'transaction-status',
  'user-settings',
] as const;
type Screen = typeof screenIds[number];

const footerNavItems = ['home', 'transfers', 'action', 'settings', 'profile'] as const;
type FooterNavItem = typeof footerNavItems[number];

const screenTitles: Record<Screen, string> = {
  splash: '',
  'feature-selection': 'Choose Your Banking Features',
  'account-overview': 'My Account',
  'payment-form': 'Make a Payment',
  'transaction-status': 'Transaction Status',
  'user-settings': 'Settings',
};

/**
 * Main page component that orchestrates the navigation between different application screens.
 * It acts as a state machine, controlling which screen is visible based on user interaction.
 */
const IndexPage: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('splash');
  const [activeFooterItem, setActiveFooterItem] = useState<FooterNavItem>('home');

  // --- Navigation Handlers ---

  const handleGetStarted = useCallback(() => setScreen('feature-selection'), []);

  const handleFeaturesSelected = useCallback(() => {
    setScreen('account-overview');
    setActiveFooterItem('home');
  }, []);

  const handlePaymentSubmit = useCallback(() => setScreen('transaction-status'), []);

  const handleLogout = useCallback(() => {
    // Reset to the initial state
    setScreen('splash');
    setActiveFooterItem('home');
  }, []);

  const handleBack = useCallback(() => {
    switch (screen) {
      case 'feature-selection':
        setScreen('splash');
        break;
      case 'user-settings':
      case 'payment-form':
        setScreen('account-overview');
        setActiveFooterItem('home');
        break;
      case 'transaction-status':
        setScreen('payment-form');
        setActiveFooterItem('action');
        break;
      // No back action from 'account-overview' as it's the main screen.
    }
  }, [screen]);

  /**
   * This handler is crucial for making the app navigable via the footer.
   * It assumes the Footer component can be controlled via props `onNavigate` and `activeItem`.
   * If Footer is uncontrolled, this logic would need to be adapted.
   */
  const handleFooterNav = useCallback((item: FooterNavItem) => {
    setActiveFooterItem(item);
    switch (item) {
      case 'home':
        setScreen('account-overview');
        break;
      case 'action':
        setScreen('payment-form');
        break;
      case 'settings':
      case 'profile':
        setScreen('user-settings');
        break;
      case 'transfers':
        // No transfers screen in this prototype, so we stay on the overview.
        setScreen('account-overview');
        break;
    }
  }, []);

  // --- Component Rendering Logic ---

  const renderCurrentScreen = () => {
    switch (screen) {
      case 'feature-selection':
        return <FeatureSelection onNext={handleFeaturesSelected} />;
      case 'account-overview':
        return <AccountOverview />;
      case 'payment-form':
        return <PaymentForm onSubmit={handlePaymentSubmit} />;
      case 'transaction-status':
        return <TransactionStatus />;
      case 'user-settings':
        return <UserSettings onLogout={handleLogout} />;
      default:
        return null; // Splash screen and errors are handled outside this function
    }
  };

  if (screen === 'splash') {
    return <SplashScreen onGetStarted={handleGetStarted} className="h-full" />;
  }

  const showFooter = [
    'account-overview',
    'payment-form',
    'transaction-status',
    'user-settings',
  ].includes(screen);

  const showBackButton = screen !== 'account-overview';

  const headerActions = screen === 'account-overview' ? (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Profile" onClick={() => handleFooterNav('profile')}>
        <User className="h-5 w-5" />
      </Button>
    </div>
  ) : undefined;

  // This structure assumes `MainAppLayout` is full-screen and `Footer` overlays it.
  // A padding-bottom (`pb-16`) is added to the content wrapper to prevent the sticky footer
  // from obscuring the last items in the scrollable view. This is a pragmatic workaround
  // to use the provided components as-is while achieving the desired layout.
  return (
    <>
      <MainAppLayout
        title={screenTitles[screen]}
        onBack={showBackButton ? handleBack : undefined}
        actions={headerActions}
      >
        <div className={showFooter ? 'pb-16' : ''}>{renderCurrentScreen()}</div>
      </MainAppLayout>

      {showFooter && (
        // @ts-expect-error - The provided Footer component is uncontrolled. To enable navigation,
        // we are passing props as if it were a controlled component. This would require
        // a modification to Footer.tsx to accept `onNavigate` and `activeItem` props.
        <Footer onNavigate={handleFooterNav} activeItem={activeFooterItem} />
      )}
    </>
  );
};

export default IndexPage;
