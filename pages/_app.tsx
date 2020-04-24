import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { DefaultSeo } from "next-seo";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

export default class CustomApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", () => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    const DEFAULT_SEO = {
      title: "Martinlabs Covid19 Visualisation",
      description:
        "Yet another attempt to visualise covid19 cases data from Datahub.io dataset",
      openGraph: {
        url: "https://covid19.martinlabs.me",
        type: "website",
        locale: "en_US",
        title: "Martinlabs Covid19 Visualisation",
        description:
          "Yet another attempt to visualise covid19 cases data from Datahub.io dataset",
        images: [
          {
            url:
              "https://res.cloudinary.com/martin-labs/image/upload/v1587648102/covid19-visualisation-website-thumbanail_a5l3bk.png",
            width: 800,
            height: 600,
            alt: "Martinlabs",
          },
        ],
        site_name: "Martinlabs Covid19 Visualisation",
        imageWidth: 1200,
        imageHeight: 1200,
      },
      twitter: {
        handle: "@wackyshut",
        cardType: "summary_large_image",
      },
    };

    return (
      <>
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />
      </>
    );
  }
}
