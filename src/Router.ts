export class Router {
    getCustomHistory() {
      const generateKey = () => Math.random().toString(36).substr(2, 6);
  
      // Exported only for test
      type WindowInternal = Window & {
        CustomEvent?: new <T>(
          typeArg: string,
          eventInitDict?: CustomEventInit<T>
        ) => CustomEvent<T>;
        Event: typeof Event;
      };
  
      type IPrototype = {
        prototype: any;
      };
  
      type InitCustomEventParams<T = any> = {
        bubbles: boolean;
        cancelable: boolean;
        detail: T;
      };
  
      // IE Polyfill for CustomEvent
      const CreateEvent =
        (windowInternal: Window, documentInternal: Document) =>
        (event: string, params: InitCustomEventParams): CustomEvent => {
          // @ts-ignore
          if (typeof windowInternal.CustomEvent === "function") {
            // @ts-ignore
            return new windowInternal.CustomEvent(event, params);
          }
          const paramsToFunction = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined,
          };
          const evt: CustomEvent = documentInternal.createEvent("CustomEvent");
          evt.initCustomEvent(
            event,
            paramsToFunction.bubbles,
            paramsToFunction.cancelable,
            paramsToFunction.detail
          );
          (evt as CustomEvent & IPrototype).prototype =
            // @ts-ignore
            windowInternal.Event.prototype;
          return evt;
        };
  
      type WindowHistoryState = typeof window.history.state;
  
      type CustomHistory = {
        replaceState(
          url?: string | null,
          stateHistory?: WindowHistoryState
        ): void;
      };
  
      const getHistory = (
        windowInternal: WindowInternal,
        CreateEventInternal: (
          event: string,
          params?: InitCustomEventParams
        ) => CustomEvent,
        generateKeyInternal: typeof generateKey
      ): CustomHistory => {
        return {
          replaceState: (
            url?: string | null,
            stateHistory?: WindowHistoryState
          ): void => {
            const key = generateKeyInternal();
            const state = stateHistory || windowInternal.history.state;
            // @ts-ignore
            windowInternal.history.replaceState({ key, state }, null, url);
            windowInternal.dispatchEvent(CreateEventInternal("popstate"));
          },
        };
      };
  
      const getCustomHistory = () =>
      // @ts-ignore
        getHistory(window, CreateEvent(window, document), generateKey);
      return getCustomHistory();
    }
  }
  