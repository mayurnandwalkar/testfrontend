import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title}`}</title>
      {meta}
      <link
        rel="stylesheet"
        href="//googleads.github.io/videojs-ima/node_modules/video.js/dist/video-js.min.css"
      />
      <link
        rel="stylesheet"
        href="//googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.css"
      />
      <link
        rel="stylesheet"
        href="//googleads.github.io/videojs-ima/dist/videojs.ima.css"
      />
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/clappr-ima-plugin@latest/dist/clappr-ima-plugin.min.js"
      ></script>
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
