import React, { useState } from "react";


const Menu = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const menuData = {
    tab1: [
      {
        id: 1,
        image: "/assets/img/menu/price1.jpg",
        name: "Chocolate cake with frost",
        price: "$50",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 2,
        image: "/assets/img/menu/price2.jpg",
        name: "Black forest with strawberries",
        price: "$70",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate Soufflé sweet.",
      },
      {
        id: 3,
        image: "/assets/img/menu/price3.jpg",
        name: "Walnut Cake",
        price: "$30",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 4,
        image: "/assets/img/menu/price1.jpg",
        name: "Chocolate cake with frost",
        price: "$50",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 5,
        image: "/assets/img/menu/price2.jpg",
        name: "Black forest with strawberries",
        price: "$70",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate Soufflé sweet.",
      },
      {
        id: 6,
        image: "/assets/img/menu/price3.jpg",
        name: "Walnut Cake",
        price: "$30",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
    ],
    tab2: [
      {
        id: 1,
        image: "img/menu/price2.jpg",
        name: "Wedding cake with strawberries",
        price: "$70",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate Soufflé sweet.",
      },
      {
        id: 2,
        image: "/assets/img/menu/price1.jpg",
        name: "Chocolate Xmas cake with frost",
        price: "$50",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 3,
        image: "/assets/img/menu/price3.jpg",
        name: "Walnut Cake",
        price: "$30",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 4,
        image: "/assets/img/menu/price1.jpg",
        name: "Chocolate cake with frost",
        price: "$50",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 5,
        image: "/assets/img/menu/price2.jpg",
        name: "Black forest with strawberries",
        price: "$70",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate Soufflé sweet.",
      },
      {
        id: 6,
        image: "/assets/img/menu/price3.jpg",
        name: "Walnut Cake",
        price: "$30",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
    ],
    tab3: [
      {
        id: 1,
        image: "/assets/img/menu/price1.jpg",
        name: "Chocolate Cupcakes",
        price: "$50",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 2,
        image: "/assets/img/menu/price2.jpg",
        name: "Black forest with strawberries",
        price: "$70",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate Soufflé sweet.",
      },
      {
        id: 3,
        image: "/assets/img/menu/price3.jpg",
        name: "Walnut Cupcakes",
        price: "$30",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 4,
        image: "/img/menu/price2.jpg",
        name: "Chocolate cake with frost",
        price: "$50",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
      {
        id: 5,
        image: "img/menu/price2.jpg",
        name: "Black forest with strawberries",
        price: "$70",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate Soufflé sweet.",
      },
      {
        id: 6,
        image: "img/menu/price3.jpg",
        name: "Walnut Cake",
        price: "$30",
        description:
          "Cupcake ipsum dolor sit. Amet toffee pastry caramels macaroon oat cake tart. Gummi bears tart ice cream donut chocolate. Soufflé sweet tootsie roll macaroon jelly-o chocolate cake croissant sweet.",
      },
    ],
  };

  const MenuItem = ({ item }) => (
    <div className="menu-item">
      <div className="menu-item-pic lightbox">
        <a href={item.image}>
          <img
            className="img-responsive img-circle img-price"
            src={item.image}
            alt={item.name}
          />
        </a>
      </div>
      <div className="menu-item-name">{item.name}</div>
      <div className="menu-item-price">{item.price}</div>
      <div className="menu-item-description">
        <p>{item.description}</p>
      </div>
    </div>
  );

  return (
    <div className="content-wrapper">
      <div className="divider-top">
        <div className="header-info col-md-12">
          <div className="inside-wrapper container">
            <h1>Our Menu</h1>
            <ul className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="active">Our Menu</li>
            </ul>
          </div>
        </div>
        <div className="gradient-overlay"></div>
      </div>

      <div className="content-box container">
        <section className="inside-page">
          <div className="inside-wrapper container">
            <h2>Cakes for all tastes</h2>
            <p>
              Donec commodo sodales ex, scelerisque laoreet nibh hendrerit id.
              In aliquet magna nec Li lingues differe solmen in li grammatica,
              li pronunciation e li plu commun vocabules, Etiam rhoncus leo a
              dolor placerat, nec elementum ipsum convall.
            </p>
            <p>
              Aliquam erat volutpat In id fermentum augue, ut pellentesque leo.
              Maecenas at arcu risus. Donec commodo sodales ex, scelerisque
              laoreet nibh hendrerit id. In aliquet magna nec lobortis maximus.
              Etiam rhoncus leo a dolor placerat, nec elementum ipsum convall.
            </p>

            <div className="row">
              <div className="col-lg-3 margin1">
                <ul className="nav nav-tabs full tabs-left" id="myTab">
                  <li className={activeTab === "tab1" ? "active" : ""}>
                    <a
                      href="#tab1"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("tab1");
                      }}
                    >
                      <i className="flaticon-cake-4"></i>
                      Birthday Cakes
                    </a>
                  </li>
                  <li className={activeTab === "tab2" ? "active" : ""}>
                    <a
                      href="#tab2"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("tab2");
                      }}
                    >
                      <i className="flaticon-cake-5"></i>
                      Special Cakes
                    </a>
                  </li>
                  <li className={activeTab === "tab3" ? "active" : ""}>
                    <a
                      href="#tab3"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("tab3");
                      }}
                    >
                      <i className="flaticon-cup-cake"></i>
                      Cupcakes and Others
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-9">
                <div className="anchor"></div>
                <div className="tab-content">
                  <div
                    className={`tab-pane fade ${
                      activeTab === "tab1" ? "active in" : ""
                    }`}
                    id="tab1"
                  >
                    <div className="prices-main">
                      <div className="col-md-12">
                        <div className="menu-body">
                          <div className="menu-section">
                            {menuData.tab1.map((item) => (
                              <MenuItem key={item.id} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade ${
                      activeTab === "tab2" ? "active in" : ""
                    }`}
                    id="tab2"
                  >
                    <div className="prices-main">
                      <div className="col-md-12">
                        <div className="menu-body">
                          <div className="menu-section">
                            {menuData.tab2.map((item) => (
                              <MenuItem key={item.id} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade ${
                      activeTab === "tab3" ? "active in" : ""
                    }`}
                    id="tab3"
                  >
                    <div className="prices-main">
                      <div className="col-md-12">
                        <div className="menu-body">
                          <div className="menu-section">
                            {menuData.tab3.map((item) => (
                              <MenuItem key={item.id} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Menu;
