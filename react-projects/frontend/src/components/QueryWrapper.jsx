import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

// A component that handles error and loading from useSuspenseQuery
function QueryWrapper({ children, loadingMessage }) {
  const { reset } = useQueryErrorResetBoundary(); // The function that resets cached error

  return (
    <ErrorBoundary
      onReset={reset} // Resets cached error
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="error-box">
          <p>⚠️ Error: {error.message}</p>
          <button onClick={resetErrorBoundary} className="btn-retry">
            Try Again
          </button>{" "}
          {/* Resets UI error */}
        </div>
      )}
    >
      <Suspense
        fallback={<div className="loading-spinner">{loadingMessage}</div>}
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default QueryWrapper;
