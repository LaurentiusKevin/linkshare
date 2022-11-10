import nookies from "nookies";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Home(props) {
  return (
    <>
      <div className="card notch-clear rounded-0 gradient-dark mb-n5">
        <div className="card-body pt-4 mt-2 mb-n2">
          <h1 className="color-white font-30 float-start">Welcome</h1>
          <a
            href="#"
            data-menu="menu-cards"
            className="float-end color-white btn btn-xxs font-600 rounded-s border-white"
          >
            <i className="fa fa-plus me-2"></i>Add Card
          </a>
          <div className="clearfix"></div>
        </div>

        <div className="card-body mx-0 px-0 mt-n4 mb-4">
          <Splide
            options={{
              autoplay: true,
              interval: 5000,
              rewind: true,
              arrows: false,
              perPage: 1,
              width: "100%",
              focus: "center",
              trimSpace: true,
            }}
          >
            <SplideSlide>
              <div
                className="card card-style mx-3 mt-4 bg-20"
                style={{ height: 210, width: "95vw" }}
              >
                <div className="card-top ps-3 pt-3">
                  <h1 className="color-white font-19">Credit Card</h1>
                </div>
                <div className="card-center pe-3">
                  <h4 className="color-white text-end">**** **** **** 6345</h4>
                </div>
                <div className="card-bottom ps-3 pb-2">
                  <h5 className="color-white">
                    {props.email ?? "Anda belum login"}
                  </h5>
                </div>
                <div className="card-bottom pe-3 pb-2">
                  <h5 className="color-white float-end">01/26</h5>
                </div>
                <div className="card-overlay bg-gradient"></div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div
                className="card card-style mx-3 mt-4 bg-1"
                style={{ height: 210, width: "95vw" }}
              >
                <div className="card-top ps-3 pt-3">
                  <h1 className="color-white">AMEX</h1>
                </div>
                <div className="card-center pe-3">
                  <h4 className="color-white text-end">**** **** **** 3415</h4>
                </div>
                <div className="card-bottom ps-3 pb-2">
                  <h5 className="color-white">
                    {props.email ?? "Anda belum login"}
                  </h5>
                </div>
                <div className="card-bottom pe-3 pb-2">
                  <h5 className="color-white float-end">03/25</h5>
                </div>
                <div className="card-overlay bg-gradient"></div>
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </div>

      <div className="card card-style mt-n3">
        <div className="content mb-2 mt-3">
          <div className="row text-center mb-0">
            <a href="#" data-menu="menu-withdraw" className="col-3">
              <span className="icon icon-l gradient-green shadow-l rounded-sm">
                <i className="fa fa-university font-18 color-white"></i>
              </span>
              <p className="mb-0 pt-1 font-11">Withdraw</p>
            </a>
            <a href="#" data-menu="menu-transfer" className="col-3">
              <span className="icon icon-l gradient-blue shadow-l rounded-sm">
                <i className="fa fa-arrow-up font-18 color-white"></i>
              </span>
              <p className="mb-0 pt-1 font-11">Transfer</p>
            </a>
            <a href="#" data-menu="menu-request" className="col-3">
              <span className="icon icon-l gradient-brown shadow-l rounded-sm">
                <i className="fa fa-arrow-down font-18 color-white"></i>
              </span>
              <p className="mb-0 pt-1 font-11">Request</p>
            </a>
            <a href="#" data-menu="menu-receipts" className="col-3">
              <span className="icon icon-l gradient-magenta shadow-l rounded-sm">
                <i className="fa fa-receipt font-18 color-white"></i>
              </span>
              <p className="mb-0 pt-1 font-11">Bills</p>
            </a>
          </div>
        </div>
      </div>

      <div className="card card-style mt-n3">
        <div className="content mb-2 mt-3">
          <div className="d-flex">
            <div className="pe-4">
              <p className="font-600 color-highlight mb-0">Your Balance</p>
              <h1>$23,500</h1>
            </div>
            <div className="w-100 pt-1">
              <h6 className="font-14 font-500">
                Income
                <span className="float-end color-green-dark">+$3.115</span>
              </h6>
              <div className="divider mb-2 mt-1"></div>
              <h6 className="font-14 font-500">
                Expenses
                <span className="float-end color-red-dark">-$1.315</span>
              </h6>
            </div>
          </div>
          <div className="divider mb-3"></div>
          <div className="row mb-0">
            <div className="col-6 pe-1">
              <h6 className="font-12 font-500">Subscriptions</h6>
              <h2 className="color-brown-dark mb-0">+11.2%</h2>
            </div>
            <div className="col-6 ps-1">
              <h6 className="font-12 font-500">Savings</h6>
              <h2 className="color-blue-dark mb-0">$14,500</h2>
            </div>
            <div className="col-12 pb-3"></div>
          </div>
        </div>
      </div>

      <div className="card card-style">
        <div className="content mb-0">
          <p className="font-600 color-highlight mb-n1">Friends and Family</p>
          <h2>Transactions</h2>
          <p>
            Showing latest activity from your card. These transactions have
            already been processed.
          </p>
          <div className="list-group list-custom-large">
            <a href="#">
              <img src="/images/pictures/6s.jpg" className="rounded-xl" />
              <span>Jane Louder</span>
              <strong>Direct Wire Transfer</strong>
              <span className="badge bg-red-dark font-11">25.00 USD</span>
              <i className="fa fa-angle-right"></i>
            </a>
            <a href="#">
              <img src="/images/pictures/15s.jpg" className="rounded-xl" />
              <span>Johanna Doe</span>
              <strong>Direct Wire Transfer</strong>
              <span className="badge bg-green-dark font-11">100.00 USD</span>
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="card card-style">
        <div className="content mb-0">
          <p className="font-600 color-highlight mb-n1">Your Latest</p>
          <h2>Subscriptions</h2>
          <p>
            Showing latest activity from your card. These transactions have
            already been processed.
          </p>
          <div className="list-group list-custom-large">
            <a href="#">
              <i className="fab fa-spotify rounded-xl shadow-s bg-dark-dark"></i>
              <span>Spotify Premium</span>
              <strong>Monthly Subscription</strong>
              <span className="badge bg-yellow-dark font-11">25.00 USD</span>
              <i className="fa fa-angle-right"></i>
            </a>
            <a href="#">
              <i className="fa fa-heart rounded-xl shadow-s bg-red-dark"></i>
              <span>Gym Membership</span>
              <span className="badge bg-red-dark font-11">15.00 USD</span>
              <strong className="left-10">Monthly Subsciption</strong>
              <i className="fa fa-angle-right"></i>
            </a>
            <a href="#" className="border-0">
              <i className="fa fa-dollar-sign rounded-xl shadow-s bg-green-dark"></i>
              <span>Bank Added Funds</span>
              <strong>Manual Payment Adusted</strong>
              <span className="badge bg-blue-dark font-11">1500.00 USD</span>
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="card card-style">
        <div className="content mb-0">
          <p className="font-600 color-highlight mb-n1">Graphical</p>
          <h2>Overview</h2>
          <p>
            Showing latest activity from your card. These transactions have
            already been processed.
          </p>
          <div className="chart-container mb-4" style={{ height: "300px" }}>
            <canvas className="wallet-chart" id="wallet-chart"></canvas>
          </div>
        </div>
      </div>

      <div className="card card-style">
        <div className="content">
          <p className="font-600 color-highlight mb-n1">Financial</p>
          <h2>Reports</h2>
          <p>
            Showing latest activity from your card. These transactions have
            already been processed.
          </p>
          <a href="#" className="d-flex py-2">
            <div>
              <i className="fa fa-file-signature icon-30 me-3 mt-2 fa-2x"></i>
            </div>
            <div>
              <p className="color-highlight mb-n1 font-12 font-600">Download</p>
              <h5 className="mb-0">Quarter Report</h5>
            </div>
          </a>
          <a href="#" className="d-flex py-2">
            <div>
              <i className="fa fa-file-pdf icon-30 me-3 mt-2 fa-2x"></i>
            </div>
            <div>
              <p className="color-highlight mb-n1 font-12 font-600">Download</p>
              <h5 className="mb-0">Savings Sheet</h5>
            </div>
          </a>
          <a href="#" className="d-flex py-2">
            <div>
              <i className="fa fa-file-invoice icon-30 me-3 mt-2 fa-2x"></i>
            </div>
            <div>
              <p className="color-highlight mb-n1 font-12 font-600">Download</p>
              <h5 className="mb-0">Service Invoice</h5>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  return {
    props: {
      email: cookies.email ?? null,
      token: cookies.accessToken ?? null,
      uid: cookies.uid ?? null,
    },
  };
}
