import React, { useEffect } from "react";
import {
  Navigate,
  useRoutes,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
// layouts
// import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
import ArtistLayout from "src/layouts/artist";
import UserLayout from "src/layouts/user";
//

import Login from "../pages/Login";
import Register from "../pages/Register";

import NotFound from "../pages/Page404";
import DashboardApp from "../pages/DashboardApp";

import ForgotPassword from "src/pages/ForgotPassword";
import ResetPassword from "src/pages/ResetPassword";

//protected
import LoggedInProtection from "./LoggedInProtection";
import LoggedOutProtection from "./LoggedOutProtection";
import { getToken, deleteToken } from "src/store/localStorage";
import { loadProfile } from "src/store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import VerifyEmail from "src/pages/VerifyEmail";
import EmailToBeVerified from "src/pages/EmailToBeVerified";
import ArtistOnboarding from "src/pages/ArtistOnBoarding";
import ArtistAbout from "src/pages/ArtistAbout";
import ArtistOverview from "src/pages/ArtistOverview";
import ArtistAlbums from "src/pages/ArtistAlbums";
import ArtistSetting from "src/pages/ArtistSetting";
import Payment from "src/pages/Payment";
import ViewSingleAlbumArtist from "src/pages/ViewSingleAlbumArtistSection";
import ViewArtistTracks from "src/pages/ViewArtistTracks";
import ViewArtistSingleTrack from "src/pages/ViewArtistSingleTrack";

import UserDashboard from "src/pages/UserDashboard";
import SingleTrack from "src/pages/ViewSingleTrack";
import ViewSingleArtist from "src/pages/ViewSingleArtist";
import ViewArtists from "src/pages/ViewArtists";
import ViewAlbums from "src/pages/ViewAlbums";
import ViewSingleAlbum from "src/pages/ViewSingleAlbum";
import Pricing from "src/pages/Pricing";
import ViewPurchasedTracks from "src/pages/ViewPurchasedTracks";

import Search from "src/pages/Search";
import ViewTracksByGenre from "src/pages/ViewTracksByGenre";
import UserSetting from "src/pages/UserSetting";
import Cart from "src/pages/UserCart";
import Checkout from "src/pages/UserCheckout";
import Subscription from "src/pages/Subscription";
import Billing from "src/pages/Billing";
import ViewPlaylists from "src/pages/ViewPlaylists";
import ViewSinglePlaylist from "src/pages/ViewSinglePlaylist";
import ViewFavorites from "src/pages/Favorites";

import Home from "src/pages/Home";
import ArtistOnBoarding from "src/pages/ArtistOnBoarding";
import ArtistRegister from "src/pages/ArtistRegister";
import ArtistLogin from "src/pages/ArtistLogin";
import FanLogin from "src/pages/FanLogin";
// ----------------------------------------------------------------------

export default function Router() {
  const {
    isSignedIn = false,
    role,
    isArtistOnboarded,
    userID,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (token && !isSignedIn) {
        const loadProfileResponse = await dispatch(loadProfile(token));
        if (loadProfileResponse) {
          deleteToken();
          navigate("/");
        }
      }
      if (!token && !isSignedIn) {
        console.log("token is not present and not signed in");
         if (location.pathname === "/reset-password") {
            navigate(`/reset-password?token=${params.get("token")}`);
         } else if (location.pathname === "/artist-verify-email") {
            // console.log("token:"+params.get("token"))
            navigate(`/artist-verify-email?token=${params.get("token")}`);
         } else {
            navigate("/");
         }
      }
      // console.log(token,"token")
      // console.log(role,"role")
      // console.log(isArtistOnboarded,"isArtistOnboarded")


      if (token && isSignedIn && role === "Artist" && !isArtistOnboarded) {
        navigate("/artist-onboarding");
      }
    };
    fetchProfile();
  }, [isSignedIn, dispatch]);

  const renderRedirectToRoute = () => {
    return isSignedIn && role === "Artist" && !isArtistOnboarded
      ? "/artist-onboarding"
      : isSignedIn && role === "Artist" && isArtistOnboarded
        ? "/artist"
        : isSignedIn && role === "Customer"
          ? "/dashboard"
          : "/";
  };

  return useRoutes([
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "/",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <Home />
            </LoggedOutProtection>
          ),
        },
        {
          path: "signup",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <Register />
            </LoggedOutProtection>
          ),
        },
        {
          path: "artist-signup",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <ArtistRegister />
            </LoggedOutProtection>
          ),
        },
        {
          path: "login",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <Login />
            </LoggedOutProtection>
          ),
        },
        {
          path: "fan-login",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <FanLogin/>
            </LoggedOutProtection>
          ),
        },
        {
          path: "artist-login",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <ArtistLogin />
            </LoggedOutProtection>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <LoggedOutProtection redirectTo={renderRedirectToRoute()}>
              <ForgotPassword />
            </LoggedOutProtection>
          ),
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "artist-verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "email-to-verify",
          element: <EmailToBeVerified />,
        },
        {
          path: "artist-onboarding",
          element: <ArtistOnBoarding />,
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/artist",
      element: (
        <LoggedInProtection redirectTo={"/login"}>
          <ArtistLayout />
        </LoggedInProtection>
      ),
      children: [
        {
          path: "",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ArtistOverview />
            </LoggedInProtection>
          ),
        },
        {
          path: "about",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ArtistAbout />
            </LoggedInProtection>
          ),
        },
        {
          path: "tracks",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewArtistTracks />
            </LoggedInProtection>
          ),
        },
        {
          path: "tracks/:trackId",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewArtistSingleTrack />
            </LoggedInProtection>
          ),
        },
        {
          path: "albums",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ArtistAlbums />
            </LoggedInProtection>
          ),
        },
        {
          path: "albums/:albumId",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewSingleAlbumArtist />
            </LoggedInProtection>
          ),
        },
        {
          path: "settings",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ArtistSetting />
            </LoggedInProtection>
          ),
        },
        {
          path: "payment",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Payment />
            </LoggedInProtection>
          ),
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <LoggedInProtection redirectTo={"/login"}>
          <UserLayout />
        </LoggedInProtection>
      ),
      children: [
        {
          path: "",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <UserDashboard />
            </LoggedInProtection>
          ),
        },
        {
          path: "track/:trackId",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <SingleTrack />
            </LoggedInProtection>
          ),
        },
        {
          path: "artists",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewArtists />
            </LoggedInProtection>
          ),
        },
        {
          path: "artist/:artistId",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewSingleArtist />
            </LoggedInProtection>
          ),
        },
        {
          path: "albums",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewAlbums />
            </LoggedInProtection>
          ),
        },
        {
          path: "album/:albumId",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewSingleAlbum />
            </LoggedInProtection>
          ),
        },
        {
          path: "search",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Search />
            </LoggedInProtection>
          ),
        },
        {
          path: "tracks/genre/:slug",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewTracksByGenre />
            </LoggedInProtection>
          ),
        },
        {
          path: "settings",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <UserSetting />
            </LoggedInProtection>
          ),
        },
        {
          path: "cart",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Cart />
            </LoggedInProtection>
          ),
        },
        {
          path: "checkout",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Checkout />
            </LoggedInProtection>
          ),
        },
        {
          path: "pricing",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Pricing />
            </LoggedInProtection>
          ),
        },
        {
          path: "subscriptions/checkout",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Subscription />
            </LoggedInProtection>
          ),
        },
        {
          path: "purchased-tracks",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewPurchasedTracks />
            </LoggedInProtection>
          ),
        },
        {
          path: "billing",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <Billing />
            </LoggedInProtection>
          ),
        },
        {
          path: "playlists",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewPlaylists />
            </LoggedInProtection>
          ),
        },
        {
          path: "playlist/:playlistId",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewSinglePlaylist />
            </LoggedInProtection>
          ),
        },
        {
          path: "favorites",
          element: (
            <LoggedInProtection redirectTo={"/login"}>
              <ViewFavorites />
            </LoggedInProtection>
          ),
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
