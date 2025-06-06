import { SLIDER_CUSTOMIZE, TEXTAREA_CUSTOMIZE } from '@rjsf/snapshot-tests';

export const COMPUTED_STYLE_MOCK = {
  width: 100,
  'box-sizing': 10,
  'padding-bottom': 1,
  'padding-top': 1,
  'border-bottom-width': 1,
  'border-top-width': 1,
} as unknown as CSSStyleDeclaration;

export const FORM_RENDER_OPTIONS = {
  [TEXTAREA_CUSTOMIZE]: {
    createNodeMock: (element: any) => {
      if (element.type === 'textarea') {
        // the `TextareaAutosize` code expects a ref for two textareas to exist, so use the feature of
        // react-test-renderer to create one
        // See: https://reactjs.org/docs/test-renderer.html#ideas
        if (element.props['aria-hidden']) {
          // The hidden one reads the following values
          return {
            style: { width: 10 },
            scrollHeight: 100,
          };
        }
        // The other one needs to look like an input node with focus and style elements
        return {
          nodeName: 'INPUT',
          focus: jest.fn(),
          style: {},
        };
      }
      return null;
    },
  },
  [SLIDER_CUSTOMIZE]: {
    createNodeMock: (element: any) => {
      // the `Slider` code expects a ref for a span.root to exist, so use the feature of
      // react-test-renderer to create one
      // See: https://reactjs.org/docs/test-renderer.html#ideas
      if (element.type === 'span' && element.props.id === 'root') {
        // Pretend to be an event listening component inside of an event listening document
        return {
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          ownerDocument: {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
          },
        };
      }
      return null;
    },
  },
};
