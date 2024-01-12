export enum ModeEnum {
  Single_Bed,
  Ribber$_Classic,
  Ribber$_Middle_Colors_Twice,
  Ribber$_Heart_of_Pluto,
  Ribber$_Circular,
}

export class Mode {
  public name(m: ModeEnum): String {
    switch(m) {
      case ModeEnum.Single_Bed: {
        return "Singlebed";
      }
      case ModeEnum.Ribber$_Classic: {
        return "Ribber: Classic";
      }
      case ModeEnum.Ribber$_Middle_Colors_Twice: {
        return "Ribber: Middle Colors Twice";
      }
      case ModeEnum.Ribber$_Heart_of_Pluto: {
        return "Ribber: Heart of Pluto";
      }
      case ModeEnum.Ribber$_Circular: {
        return "Ribber: Circular";
      }
    }
  }
}