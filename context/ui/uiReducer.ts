import { UIState } from './';

type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - Set isAddingEntry', payLoad: boolean }
    | { type: 'UI - Start Dragging' }
    | { type: 'UI - End Dragging' }


export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {


   switch (action.type) {
      case 'UI - Open Sidebar':
          return {
              ...state,
              sideMenuOpen: true,
          }
          break;
      case 'UI - Close Sidebar':
          return {
              ...state,
              sideMenuOpen: false,
          }
          break;
      case 'UI - Set isAddingEntry':
          return {
              ...state,
              isAddingEntry: action.payLoad,
          }
          break;
      case 'UI - Start Dragging':
          return {
              ...state,
              isDragging: true,
          }
          break;
      case 'UI - End Dragging':
          return {
              ...state,
              isDragging: false,
          }
          break;

      default:
          return state
   }
}