/**
 * Change the layouts of an existing section
 */
 export enum configLayout {
    'OneColumn' = 'PropertyPaneChoiceGroup-OneColumn',
    'TwoColumns' = 'PropertyPaneChoiceGroup-TwoColumns',
    'ThreeColumns' = 'PropertyPaneChoiceGroup-ThreeColumns',
    'OneThirdColumnLeft' = 'PropertyPaneChoiceGroup-OneThirdColumnLeft',
    'OneThirdColumnRight' = 'PropertyPaneChoiceGroup-OneThirdColumnRight'
}

/**
 * Available layouts for a new section
 */
export type pageLayout =
    'OneColumn'
    | 'TwoColumns'
    | 'ThreeColumns'
    | 'OneThirdColumnLeft'
    | 'OneThirdColumnRight'
    | 'FullWidth'
    | 'Vertical';

/**
 * Available Background colors for a section
 */
 export enum background {
    'none' = 'emphasis-item-0',
    'neutral' = 'emphasis-item-1',
    'soft' = 'emphasis-item-2',
    'strong' = 'emphasis-item-3'
}
// export type background =
//     'noneBackgroundColorButton'
//     | 'neutralBackgroundColorButton'
//     | 'softBackgroundColorButton'
//     | 'strongBackgroundColorButton';
