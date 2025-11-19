import {EventInstance} from "@ngrx/signals/events";
import {AppState} from "../app-state.store";
import {Color} from "chroma-js";


export function colorChangedReducer(
  this: void,
  event: EventInstance<"[Converter] colorChanged", Color>,
  state: AppState
): { currentColor: Color } {
  return {currentColor: event.payload};
}
