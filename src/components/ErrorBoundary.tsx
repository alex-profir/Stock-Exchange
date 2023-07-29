import { Component } from "react";
export type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.MODE === "development") {
      console.error(error);
    }
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
