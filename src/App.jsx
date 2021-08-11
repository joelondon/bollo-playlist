import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ImDownload } from "react-icons/im";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { Property } from "./Property";

import Waveform from "./Waveform";
const { Dropbox } = require("dropbox");
import "./styles.css";

var ACCESS_TOKEN =
  "8DRYAxrQ7JcAAAAAAAAAAWAXxIGnRi1ABIzw_6DV5k3Qzmwq9gD1Q7_uGdPCZR50"; //document.getElementById('access-token').value;
var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

export const AppUi = () => {
  const [urls, setURLs] = useState(null);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState(null);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(0);
  const [pageLength] = useState(1000);

  useEffect(() => {
    const audio = [];
    dbx
      .filesListFolder({
        path:
          "/THE GLOBAL SOUND LIBRARY/United Kingdom/Bollo Brook Youth Centre/BOLLO MP3s"
      })
      .then(function(response) {
        const files = response.result.entries;
        let filesTotalAudio = 0;
        let fileAudioCounter = 0;
        for (var i = 0; i < files.length; i++) {
          if (
            files[i].name.includes("mp3") &&
            files[i].name.includes("@") === false
          ) {
            filesTotalAudio = filesTotalAudio + 1;
            dbx
              .filesGetTemporaryLink({
                path: files[i].path_display
              })
              .then(function(response) {
                audio.push({
                  url: response.result.link,
                  name: response.result.metadata.name,
                  size: response.result.metadata.size
                });
                fileAudioCounter = fileAudioCounter + 1;
                if (fileAudioCounter === filesTotalAudio) {
                  setPages(Math.floor(filesTotalAudio / pageLength));
                  setURLs(audio);
                  setUrl(audio[0].url);
                  setName(audio[0].name);
                }
              })
              .catch(function(error) {
                console.error(error);
              });
          }
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);

  const pageFirst = () => {
    return page === 0;
  };

  const pageLast = () => {
    return page === pages - 1;
  };

  const backward = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const forward = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.100", "inherit")}
      py="12"
      px={{
        md: "8"
      }}
    >
      <Card maxW="3xl" mx="auto">
        <CardHeader
          title={
            url && (
              <>
                <span>{name}</span>
                <Waveform url={url} name={name} />
              </>
            )
          }
          action={
            url && (
              <Button variant="outline" minW="20" leftIcon={<ImDownload />}>
                <a href={url}>Download</a>
              </Button>
            )
          }
        />
        <CardContent height="15rem" overflow="scroll">
          {urls &&
            urls.length > 0 &&
            urls
              .filter(
                (el, i) => i >= page * pageLength && i < (page + 1) * pageLength
              )
              .map(el => (
                <Property
                  key={el.name}
                  label={
                    <Box
                      as="button"
                      onClick={() => {
                        setUrl(el.url);
                        setName(el.name);
                      }}
                    >
                      {el.name}
                    </Box>
                  }
                />
              ))}
        </CardContent>
      </Card>
    </Box>
  );
};
