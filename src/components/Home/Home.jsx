import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import About from "../../assets/About.png";
import ContactUs from './ContactUs'

const Home = () => {
    return (
        <div>
          <div>
            {/* ----------------------Banner section------------------------ */}
            <div className="carousel min-h-screen">
              <div id="item1" className="carousel-item w-full">
                <img src={banner1} className="w-full" />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img src={banner2} className="w-full" />
              </div>
              <div id="item3" className="carousel-item w-full">
                <img src={banner3} className="w-full" />
              </div>
              <div id="item4" className="carousel-item w-full">
                <img src={banner2} className="w-full" />
              </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
              <a href="#item1" className="btn btn-xs">
                1
              </a>
              <a href="#item2" className="btn btn-xs">
                2
              </a>
              <a href="#item3" className="btn btn-xs">
                3
              </a>
              <a href="#item4" className="btn btn-xs">
                4
              </a>
            </div>
          </div>
          {/*-------------------- About Section -------------------------*/}
          <div>
            <div
          
              className="hero min-h-screen bg-white
            "
            >
              
              <div className="hero-content flex-col lg:flex-row-reverse justify-between items-center w-full">
                <img src={About} className="max-w-sm rounded-lg bg-none" />
                <div>
                <p className="text-3xl font-bold">About Us</p>
                  <p className="py-6 max-w-xl text-center m-auto">
                    Welcome to StudyMart, your one-stop destination for all things
                    books and stationery! Browse our curated collection of academic
                    and non-academic books, alongside a wide range of stationery
                    essentials. From pens to textbooks, we've got you covered. Enjoy
                    competitive pricing, wholesale options for bulk purchases, and
                    exclusive discounts for academic institutions and bookshop
                    owners. Dive into a world of knowledge and creativity with us
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*-------------------- Contact us Section -------------------------*/}
          <ContactUs></ContactUs>
        </div>
      );
};

export default Home;