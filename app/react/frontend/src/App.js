// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// import components
import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';
import Faq from './Components/Faq/Faq';
import Timetables from './Components/Timetables/Timetables';
import Aboutus from './Components/Aboutus/Aboutus';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      {/* web sections */}
      <Navigation />
      <Home />
      <Timetables />
      <div className="d-sm-flex">
        <div className="col-lg-6">
          <Faq />
        </div>
        <div className="col-lg-6">
          <Aboutus />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
