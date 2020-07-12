export interface Gesture {
  _accountsForMovesUpTo: number;
  /** accumulated distance of the gesture since the touch started */
  dx: number;
  /** accumulated distance of the gesture since the touch started */
  dy: number;
  /** the latest screen coordinates of the recently-moved touch */
  moveX: number;
  /** the latest screen coordinates of the recently-moved touch */
  moveY: number;
  /** Number of touches currently on screen */
  numberActiveTouches: number;
  /** ID of the gestureState- persisted as long as there at least one touch on screen */
  stateID: number;
  /** current velocity of the gesture */
  vx: number;
  /** current velocity of the gesture */
  vy: number;
  /** the screen coordinates of the responder grant */
  x0: number;
  /**  the screen coordinates of the responder grant */
  y0: number;
}