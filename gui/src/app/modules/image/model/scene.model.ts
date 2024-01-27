import Scale from "../../toolbar/models/scale.model";
import SerializedImageData from "./serialized-image-data.model";
import { AlignmentEnum } from "../../../../../../shared/src/models/alignment-enum.model";
import { ColorEnum } from "../../../../../../shared/src/models/color-enum.model";

export default interface Scene {
  data: SerializedImageData | null;
  scale: Scale;
  startRow: number;
  startColor: ColorEnum;
  startNeedle: number;
  stopColor: ColorEnum;
  stopNeedle: number;
  alignment: AlignmentEnum;
  knitSide: boolean;
  width: number;
}