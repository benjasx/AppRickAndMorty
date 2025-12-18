import { useQuery } from "@tanstack/react-query";
import { getCharactersInfo } from "../actions/get-characters-Info.action ";
import { getCharactersInfoAlive } from "../actions/get-characters-InfoAlive.action";
import { getCharactersInfoDead } from "../actions/get-characters-InfoDead.action";
import { getCharactersInfoHuman } from "../actions/get-characters-InfoHuman.action";
import { getCharactersInfoAlien } from "../actions/get-characters-InfoAliens.action";

export const useCharactersInfoResponse = () => {
  return useQuery({
    queryKey: ["charactersI"],
    queryFn: () => getCharactersInfo(),
    staleTime: 1000 * 60 * 5, //5 min
  });
};

export const useCharacterInfoAlive = () => {
  return useQuery({
    queryKey: ["infoAlive"],
    queryFn: () => getCharactersInfoAlive(),
    staleTime: 1000 * 60 * 10,
  });
};

export const useCharacterInfoDead = () => {
  return useQuery({
    queryKey: ["infoDead"],
    queryFn: () => getCharactersInfoDead(),
    staleTime: 1000 * 60 * 10,
  });
};

export const useCharacterInfoHuman = () => {
  return useQuery({
    queryKey: ["infoHuman"],
    queryFn: () => getCharactersInfoHuman(),
    staleTime: 1000 * 60 * 10,
  });
};

export const useCharacterInfoAliens = () => {
  return useQuery({
    queryKey: ["infoAlien"],
    queryFn: () => getCharactersInfoAlien(),
    staleTime: 1000 * 60 * 10,
  });
};
