import { useAuth } from "@common/auth/AuthProvider";
import Banner from "@common/utils/Banner";
import Loader from "@common/utils/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero({ showToast, toastMessage }: any) {
  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 3.5 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);

  if (isLoading) {
    return <Loader />; // Replace with your loader component or style
  }

  const handleDismiss = () => {
    setBannerVisible(false);
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const randomColor = getRandomColor();

  return (
    <div className="bg-base-200">
      {bannerVisible && <Banner onDismiss={handleDismiss} />}
      <div className="p-12 pb-4 text-center">
        {user?.isLoggedIn ? (
          <div className="flex flex-col gap-6">
            <span className="text-5xl font-bold">
              <span>
                Hello there,
                <span className="ml-[-20px]" style={{ color: randomColor }}>
                  {" "}
                  {user?.username}
                </span>
                ! 🤗
              </span>
            </span>
            <span className="text-2xl font-regular">
              Your smart contract wallet address is{" "}
              <a
                className="link link-secondary"
                href={`https://sepolia.etherscan.io/address/${user?.scwAddress}`}
                target="_blank"
              >
                {user?.scwAddress}
              </a>
            </span>
            <span className="text-lg font-regular">
              <i>
                Get started by selecting the <b>Gasless NFT Minter</b> on the
                left navbar or check out AA resources below.
              </i>{" "}
            </span>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold">
                Account Abstraction Demo Dapp ⚡️
              </div>

              <p className="mt-5">
                This is your portal to the account abstraction dimension of
                Ethereum. 🧙‍♂️
              </p>
              <p className="mt-2">
                Experience sponsored transactions that allow you to mint,
                transfer and burn 🔥 NFTs without the user paying for gas.
              </p>
              <div className="flex flex-col">
                <div className="mt-8 mb-5 flex justify-between gap-4">
                  <button
                    onClick={() => router.push("/login")}
                    className="btn bg-[#324996] text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/sign-up")}
                    className="btn bg-[#445dea] text-white"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="divider"></div>
      </div>

      <div className="flex flex-col gap-6 mt-8">
        <span className="text-3xl font-bold text-center">
          Account Abstraction Resources
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-8 mx-32">
        {/* Card 1 */}
        <div className="card w-full bg-base-100 shadow-xl max-h-[250px] float-on-hover">
          <div className="card-body">
            <h2 className="card-title mt-4">Gasless NFT Minter Repo</h2>
            <p>
              Check out the code powering the Gasless NFT Minter component in
              this app!
            </p>
            <div className="card-actions justify-end">
              <a
                href="https://github.com/alchemyplatform/aa-demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary text-white flex items-center justify-center">
                  <svg
                    fill="#FFFFFF"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="30px"
                    height="30px"
                  >
                    {" "}
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                  </svg>
                  <span>View Repo</span>
                </button>
              </a>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="card w-full bg-base-100 shadow-xl max-h-[250px] float-on-hover">
          <div className="card-body">
            <h2 className="card-title mt-4">Bundler APIs</h2>
            <p>
              Submit censorship-resistant transactions to smart contract
              accounts.
            </p>
            <div className="card-actions justify-end">
              <a
                href="https://docs.alchemy.com/reference/bundler-api-quickstart"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary text-white flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 66 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M54.6199 35.8503L33.8438 0.577318C33.7432 0.403146 33.5975 0.258061 33.4215 0.156704C33.2454 0.0553471 33.0452 0.00130211 32.841 2.32362e-05C32.6368 -0.00125564 32.4359 0.0502763 32.2585 0.14942C32.0812 0.248563 31.9337 0.391811 31.8308 0.564709L25.6086 11.134C25.4048 11.48 25.2975 11.8724 25.2975 12.2719C25.2975 12.6714 25.4048 13.0639 25.6086 13.4099L39.156 36.4208C39.3599 36.7671 39.6534 37.0546 40.0068 37.2544C40.3602 37.4542 40.761 37.5591 41.1689 37.5587H53.6135C53.8172 37.5581 54.0172 37.5052 54.1935 37.405C54.3698 37.3049 54.5162 37.1612 54.618 36.9883C54.7199 36.8154 54.7737 36.6192 54.774 36.4195C54.7744 36.2198 54.7212 36.0235 54.6199 35.8503Z"
                      fill="white"
                    />
                    <path
                      d="M0.160205 54.2852L20.9363 19.0123C21.0383 18.8395 21.1848 18.696 21.3612 18.5963C21.5376 18.4965 21.7376 18.444 21.9412 18.444C22.1448 18.444 22.3449 18.4965 22.5213 18.5963C22.6977 18.696 22.8442 18.8395 22.9461 19.0123L29.1716 29.5721C29.3753 29.9186 29.4825 30.3116 29.4825 30.7116C29.4825 31.1116 29.3753 31.5046 29.1716 31.8511L15.6241 54.8621C15.4209 55.2083 15.1281 55.4959 14.7752 55.6957C14.4223 55.8955 14.0219 56.0005 13.6144 56H1.1667C0.961642 56.001 0.759984 55.9488 0.582217 55.8486C0.404449 55.7484 0.256935 55.6038 0.154671 55.4296C0.0524063 55.2553 -0.000962742 55.0577 1.31472e-05 54.8567C0.000989037 54.6556 0.056254 54.4585 0.160205 54.2852Z"
                      fill="white"
                    />
                    <path
                      d="M22.9431 55.9925H64.4954C64.6992 55.9923 64.8995 55.9395 65.0759 55.8394C65.2523 55.7393 65.3987 55.5954 65.5004 55.4222C65.6021 55.2491 65.6555 55.0527 65.6552 54.8529C65.6549 54.6531 65.6009 54.4568 65.4987 54.284L59.2829 43.7178C59.0789 43.3715 58.7855 43.084 58.4321 42.8842C58.0787 42.6845 57.6778 42.5795 57.2699 42.5799H30.1751C29.7671 42.5795 29.3663 42.6845 29.0129 42.8842C28.6595 43.084 28.3661 43.3715 28.1621 43.7178L21.9399 54.284C21.8377 54.4568 21.7837 54.6531 21.7834 54.8529C21.7831 55.0527 21.8365 55.2491 21.9382 55.4222C22.0399 55.5954 22.1863 55.7393 22.3627 55.8394C22.5391 55.9395 22.7393 55.9923 22.9431 55.9925Z"
                      fill="white"
                    />
                  </svg>

                  <span>View Docs</span>
                </button>
              </a>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="card w-full bg-base-100 shadow-xl max-h-[250px] float-on-hover">
          <div className="card-body">
            <h2 className="card-title mt-4">Gas Manager APIs</h2>
            <p>
              Cover gas costs for your users, and programatically control gas
              policies using the Gas Manager Admin APIs.
            </p>
            <div className="card-actions justify-end">
              <a
                href="https://docs.alchemy.com/reference/account-abstraction-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  // onClick={onClick}
                  className="btn btn-primary text-white flex items-center justify-center"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 66 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M54.6199 35.8503L33.8438 0.577318C33.7432 0.403146 33.5975 0.258061 33.4215 0.156704C33.2454 0.0553471 33.0452 0.00130211 32.841 2.32362e-05C32.6368 -0.00125564 32.4359 0.0502763 32.2585 0.14942C32.0812 0.248563 31.9337 0.391811 31.8308 0.564709L25.6086 11.134C25.4048 11.48 25.2975 11.8724 25.2975 12.2719C25.2975 12.6714 25.4048 13.0639 25.6086 13.4099L39.156 36.4208C39.3599 36.7671 39.6534 37.0546 40.0068 37.2544C40.3602 37.4542 40.761 37.5591 41.1689 37.5587H53.6135C53.8172 37.5581 54.0172 37.5052 54.1935 37.405C54.3698 37.3049 54.5162 37.1612 54.618 36.9883C54.7199 36.8154 54.7737 36.6192 54.774 36.4195C54.7744 36.2198 54.7212 36.0235 54.6199 35.8503Z"
                      fill="white"
                    />
                    <path
                      d="M0.160205 54.2852L20.9363 19.0123C21.0383 18.8395 21.1848 18.696 21.3612 18.5963C21.5376 18.4965 21.7376 18.444 21.9412 18.444C22.1448 18.444 22.3449 18.4965 22.5213 18.5963C22.6977 18.696 22.8442 18.8395 22.9461 19.0123L29.1716 29.5721C29.3753 29.9186 29.4825 30.3116 29.4825 30.7116C29.4825 31.1116 29.3753 31.5046 29.1716 31.8511L15.6241 54.8621C15.4209 55.2083 15.1281 55.4959 14.7752 55.6957C14.4223 55.8955 14.0219 56.0005 13.6144 56H1.1667C0.961642 56.001 0.759984 55.9488 0.582217 55.8486C0.404449 55.7484 0.256935 55.6038 0.154671 55.4296C0.0524063 55.2553 -0.000962742 55.0577 1.31472e-05 54.8567C0.000989037 54.6556 0.056254 54.4585 0.160205 54.2852Z"
                      fill="white"
                    />
                    <path
                      d="M22.9431 55.9925H64.4954C64.6992 55.9923 64.8995 55.9395 65.0759 55.8394C65.2523 55.7393 65.3987 55.5954 65.5004 55.4222C65.6021 55.2491 65.6555 55.0527 65.6552 54.8529C65.6549 54.6531 65.6009 54.4568 65.4987 54.284L59.2829 43.7178C59.0789 43.3715 58.7855 43.084 58.4321 42.8842C58.0787 42.6845 57.6778 42.5795 57.2699 42.5799H30.1751C29.7671 42.5795 29.3663 42.6845 29.0129 42.8842C28.6595 43.084 28.3661 43.3715 28.1621 43.7178L21.9399 54.284C21.8377 54.4568 21.7837 54.6531 21.7834 54.8529C21.7831 55.0527 21.8365 55.2491 21.9382 55.4222C22.0399 55.5954 22.1863 55.7393 22.3627 55.8394C22.5391 55.9395 22.7393 55.9923 22.9431 55.9925Z"
                      fill="white"
                    />
                  </svg>

                  <span>View Docs</span>
                </button>
              </a>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="card w-full bg-base-100 shadow-xl max-h-[250px] float-on-hover">
          <div className="card-body">
            <h2 className="card-title mt-4">Account Abstraction SDK</h2>
            <p>
              Simplify Account Abstraction development using the aa-sdk,
              superpowering your app tool suite.
            </p>
            <div className="card-actions justify-end">
              <a
                href="https://docs.alchemy.com/reference/gas-manager-coverage-api-quickstart"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary text-white flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 66 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M54.6199 35.8503L33.8438 0.577318C33.7432 0.403146 33.5975 0.258061 33.4215 0.156704C33.2454 0.0553471 33.0452 0.00130211 32.841 2.32362e-05C32.6368 -0.00125564 32.4359 0.0502763 32.2585 0.14942C32.0812 0.248563 31.9337 0.391811 31.8308 0.564709L25.6086 11.134C25.4048 11.48 25.2975 11.8724 25.2975 12.2719C25.2975 12.6714 25.4048 13.0639 25.6086 13.4099L39.156 36.4208C39.3599 36.7671 39.6534 37.0546 40.0068 37.2544C40.3602 37.4542 40.761 37.5591 41.1689 37.5587H53.6135C53.8172 37.5581 54.0172 37.5052 54.1935 37.405C54.3698 37.3049 54.5162 37.1612 54.618 36.9883C54.7199 36.8154 54.7737 36.6192 54.774 36.4195C54.7744 36.2198 54.7212 36.0235 54.6199 35.8503Z"
                      fill="white"
                    />
                    <path
                      d="M0.160205 54.2852L20.9363 19.0123C21.0383 18.8395 21.1848 18.696 21.3612 18.5963C21.5376 18.4965 21.7376 18.444 21.9412 18.444C22.1448 18.444 22.3449 18.4965 22.5213 18.5963C22.6977 18.696 22.8442 18.8395 22.9461 19.0123L29.1716 29.5721C29.3753 29.9186 29.4825 30.3116 29.4825 30.7116C29.4825 31.1116 29.3753 31.5046 29.1716 31.8511L15.6241 54.8621C15.4209 55.2083 15.1281 55.4959 14.7752 55.6957C14.4223 55.8955 14.0219 56.0005 13.6144 56H1.1667C0.961642 56.001 0.759984 55.9488 0.582217 55.8486C0.404449 55.7484 0.256935 55.6038 0.154671 55.4296C0.0524063 55.2553 -0.000962742 55.0577 1.31472e-05 54.8567C0.000989037 54.6556 0.056254 54.4585 0.160205 54.2852Z"
                      fill="white"
                    />
                    <path
                      d="M22.9431 55.9925H64.4954C64.6992 55.9923 64.8995 55.9395 65.0759 55.8394C65.2523 55.7393 65.3987 55.5954 65.5004 55.4222C65.6021 55.2491 65.6555 55.0527 65.6552 54.8529C65.6549 54.6531 65.6009 54.4568 65.4987 54.284L59.2829 43.7178C59.0789 43.3715 58.7855 43.084 58.4321 42.8842C58.0787 42.6845 57.6778 42.5795 57.2699 42.5799H30.1751C29.7671 42.5795 29.3663 42.6845 29.0129 42.8842C28.6595 43.084 28.3661 43.3715 28.1621 43.7178L21.9399 54.284C21.8377 54.4568 21.7837 54.6531 21.7834 54.8529C21.7831 55.0527 21.8365 55.2491 21.9382 55.4222C22.0399 55.5954 22.1863 55.7393 22.3627 55.8394C22.5391 55.9395 22.7393 55.9923 22.9431 55.9925Z"
                      fill="white"
                    />
                  </svg>

                  <span>View Docs</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#fff] my-4">Hi :)</div>
    </div>
  );
}
