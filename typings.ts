type Deck = {
  file: MediaFile;
  id: string; // video file md5 hash
  subtitles: Subtitle[][];
  updateTime: number;
};

type Subtitle = {
  endTime: number;
  id: number;
  startTime: number;
  text: string;
} & Partial<{
  currentStep: number;
  nextSeenTime: number;
  updateTime: number;
}>;

type MediaFile = {
  name: string;
  uri: string;
};
