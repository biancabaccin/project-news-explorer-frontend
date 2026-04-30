import NewsBanner from "../NewsBanner/NewsBanner";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";
import NewsPage from "../NewsPage/NewsPage";
import About from "../About/About";

export default function Main() {
  return (
    <>
      <NewsBanner />
      <Preloader />
      <NoResults />
      <NewsPage />
      <About />
    </>
  );
}
