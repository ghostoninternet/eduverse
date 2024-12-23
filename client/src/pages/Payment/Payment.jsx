import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

function Payment() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const success = searchParams.get('success');
    const cancelled = searchParams.get('cancelled');

    // Show loading state briefly
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (!success && !cancelled) {
      navigate('/', { replace: true });
      return;
    }

    // Only start countdown for success case
    if (success === 'true') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(loadingTimer);
      };
    } else {
      setIsButtonDisabled(false);
    }

    return () => clearTimeout(loadingTimer);
  }, [searchParams, navigate]);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const SuccessContent = () => (
    <>
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Payment Successful!
      </h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. You can now access your course.
      </p>
      {isButtonDisabled && (
        <p className="text-sm text-gray-500 mb-4">
          Please wait {countdown} seconds...
        </p>
      )}
    </>
  );

  const CancelledContent = () => (
    <>
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Payment Cancelled
      </h2>
      <p className="text-gray-600 mb-6">
        Your payment was cancelled. Please try again when you&apos;re ready.
      </p>
    </>
  );

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {searchParams.get('success') === 'true' ? (
          <SuccessContent />
        ) : (
          <CancelledContent />
        )}
        <button
          onClick={handleGoHome}
          disabled={isButtonDisabled}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors
            ${isButtonDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Payment;