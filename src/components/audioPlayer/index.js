import { Box, Stack, Grid, Card } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { stopTrack } from "../../store/actions/trackPlayActions";

import VideoJS from "./player";
import { useMediaQuery } from "react-responsive";

function Player() {
  const { track, playlist } = useSelector((state) => state.trackPlay);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isLargeDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const dispatch = useDispatch();

  const [playerDimensions, setPlayerDimensions] = useState({
    width: isMobile ? 350 : 700,
    height: isMobile ? 200 : 300,
  });

  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(false);

    setPlay(true);
  }, [track, playlist]);

  return (
    <>
      {(track || playlist.length > 0) && (
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: "50%",
            transform: "translateX(50%)",
            zIndex: 10000,
            padding: "0rem 1rem",
          }}
        >
          <Grid
            container
            px={3}
            width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Card
              sx={{
                width: isMobile ? 350 : 700,
                height: isMobile ? 200 : 300,
                borderRadius: "0.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "1.5rem 1rem 0rem 1rem",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              >
                {/* <MinimizeIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // setPlayerDimensions({
                    //   width: 350,
                    //   height: 150,
                    // });
                  }}
                /> */}
                <CloseIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  fontSize="small"
                  onClick={() => {
                    setPlay(false);

                    dispatch(stopTrack());
                  }}
                />
              </Stack>
              <Card
                sx={{
                  width: "100%",
                  height: playerDimensions.height - 50,
                  borderRadius: "0.5rem",
                }}
              >
                <VideoJS
                  options={{
                    autoplay: play,
                    controls: true,
                    playbackRates: [0.5, 1, 1.5, 2],
                    width:
                      playlist.length > 0
                        ? isMobile
                          ? playerDimensions.width - 100
                          : playerDimensions.width - 200
                        : playerDimensions.width - 50,
                    height: playerDimensions.height - 50,
                    // width: playerDimensions.width,
                    // height: playerDimensions.height - 50,
                    controlBar: {
                      playbackRateMenuButton: true,
                    },
                    audioPosterMode: true,
                  }}
                />
                {/* <ClapprPlayer
                  id="video"
                  source={trackToPlay[0].src}
                  // source="https://ax3-data.s3.amazonaws.com/playlist.m3u"
                  width={500}
                  height={200}
                  mute={false}
                  poster={trackToPlay[0].img}
                  play={play}
                  subscribed={subscribed}
                  nextTracks={remainingTracks}
                  updateTrackMetadata={updateTrackMetadata}
                /> */}
              </Card>
              {/* <Stack
                spacing={1}
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                width="100%"
                px={1}
              >
                <Typography variant="body1">{trackToPlay[0].name}</Typography>
                <Typography variant="body2">{trackToPlay[0].writer}</Typography>
              </Stack> */}
            </Card>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Player;
