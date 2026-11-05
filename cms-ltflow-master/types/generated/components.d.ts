import type { Schema, Struct } from '@strapi/strapi';

export interface CardCard extends Struct.ComponentSchema {
  collectionName: 'components_card_cards';
  info: {
    displayName: 'Card';
    icon: 'book';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    link_label: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CardMultiCard extends Struct.ComponentSchema {
  collectionName: 'components_card_multi_cards';
  info: {
    displayName: 'Multi Card';
    icon: 'apps';
  };
  attributes: {
    cards: Schema.Attribute.Component<'card.card', true>;
    identifier: Schema.Attribute.String;
    section_title: Schema.Attribute.String;
  };
}

export interface CustomerFocusItem extends Struct.ComponentSchema {
  collectionName: 'components_customer_focus_items';
  info: {
    description: 'Focus/Lending Category Item';
    displayName: 'Focus Item';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface MetaMetaTag extends Struct.ComponentSchema {
  collectionName: 'components_meta_meta_tags';
  info: {
    displayName: 'Meta Tag';
    icon: 'code';
  };
  attributes: {
    meta_description: Schema.Attribute.Text;
    meta_title: Schema.Attribute.String;
    og_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'Faq Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_sections';
  info: {
    displayName: 'Faq Section';
    icon: 'comments';
  };
  attributes: {
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    faqs: Schema.Attribute.Component<'shared.faq-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'You Ask. We Answer!'>;
  };
}

export interface SolutionArchitectureItem extends Struct.ComponentSchema {
  collectionName: 'components_solution_architecture_items';
  info: {
    displayName: 'Architecture Item';
    icon: 'circle';
  };
  attributes: {
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
  };
}

export interface SolutionArchitectureSection extends Struct.ComponentSchema {
  collectionName: 'components_solution_architecture_sections';
  info: {
    displayName: 'Architecture Section';
    icon: 'network-wired';
  };
  attributes: {
    badge: Schema.Attribute.String;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    items: Schema.Attribute.Component<'solution.architecture-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionBicriCard extends Struct.ComponentSchema {
  collectionName: 'components_solution_bicri_cards';
  info: {
    displayName: 'Bicri Card';
    icon: 'credit-card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    icon: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionBicriFeatures extends Struct.ComponentSchema {
  collectionName: 'components_solution_bicri_features';
  info: {
    displayName: 'Bicri Features';
    icon: 'grip';
  };
  attributes: {
    cards: Schema.Attribute.Component<'solution.bicri-card', true>;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionBnplWorkflowSection extends Struct.ComponentSchema {
  collectionName: 'components_solution_bnpl_workflow_sections';
  info: {
    displayName: 'BNPL Workflow Section';
    icon: 'diagram-project';
  };
  attributes: {
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    image: Schema.Attribute.Media<'images'>;
    left_features: Schema.Attribute.Component<
      'solution.workflow-feature',
      true
    >;
    right_features: Schema.Attribute.Component<
      'solution.workflow-feature',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SolutionCollectionCard extends Struct.ComponentSchema {
  collectionName: 'components_solution_collection_card';
  info: {
    displayName: 'Collection Card';
    icon: 'square';
  };
  attributes: {
    button_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Know more'>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SolutionCollectionCards extends Struct.ComponentSchema {
  collectionName: 'components_solution_collection_cards';
  info: {
    displayName: 'Collection Cards';
    icon: 'th';
  };
  attributes: {
    badge: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'solution.collection-card', true>;
    description: Schema.Attribute.Text;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionCustomerSuccess extends Struct.ComponentSchema {
  collectionName: 'components_solution_customer_successes';
  info: {
    description: '';
    displayName: 'Customer Success';
    icon: 'star';
  };
  attributes: {
    badge: Schema.Attribute.String;
    businessChallenge: Schema.Attribute.Text;
    businessImpact: Schema.Attribute.Text;
    companyLogo: Schema.Attribute.Media<'images'>;
    companyName: Schema.Attribute.String;
    companySubtitle: Schema.Attribute.String;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    iflowSolution: Schema.Attribute.Text;
    quoteAuthor: Schema.Attribute.String;
    quoteText: Schema.Attribute.Text;
    stars: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    stats: Schema.Attribute.Component<'solution.stat', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_solution_feature_cards';
  info: {
    displayName: 'Feature Card';
    icon: 'credit-card';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionFeatureSection extends Struct.ComponentSchema {
  collectionName: 'components_solution_feature_sections';
  info: {
    displayName: 'Feature Section';
    icon: 'list-check';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    features: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'videos'>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionPartnershipModel extends Struct.ComponentSchema {
  collectionName: 'components_solution_partnership_models';
  info: {
    displayName: 'Partnership Model';
    icon: 'layer-group';
  };
  attributes: {
    description: Schema.Attribute.Text;
    diagram: Schema.Attribute.Media<'images'>;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    features: Schema.Attribute.RichText;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SolutionPartnershipModelsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_solution_partnership_models_sections';
  info: {
    displayName: 'Partnership Models Section';
    icon: 'layer-group';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    models: Schema.Attribute.Component<'solution.partnership-model', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionStat extends Struct.ComponentSchema {
  collectionName: 'components_solution_stats';
  info: {
    displayName: 'Stat';
    icon: 'chart-line';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SolutionSuccessStats extends Struct.ComponentSchema {
  collectionName: 'components_solution_success_stats';
  info: {
    displayName: 'Success Stats';
    icon: 'chart-bar';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    stats: Schema.Attribute.Component<'solution.stat', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionWorkflowFeature extends Struct.ComponentSchema {
  collectionName: 'components_solution_workflow_feature';
  info: {
    displayName: 'Workflow Feature';
    icon: 'circle-check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SolutionWorkflowSection extends Struct.ComponentSchema {
  collectionName: 'components_solution_workflow_sections';
  info: {
    displayName: 'Workflow Section';
    icon: 'route';
  };
  attributes: {
    badge: Schema.Attribute.String;
    display_location: Schema.Attribute.Enumeration<
      ['both', 'only_detail', 'only_main']
    > &
      Schema.Attribute.DefaultTo<'both'>;
    steps: Schema.Attribute.Component<'solution.workflow-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface SolutionWorkflowStep extends Struct.ComponentSchema {
  collectionName: 'components_solution_workflow_steps';
  info: {
    displayName: 'Workflow Step';
    icon: 'chevron-right';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.card': CardCard;
      'card.multi-card': CardMultiCard;
      'customer.focus-item': CustomerFocusItem;
      'meta.meta-tag': MetaMetaTag;
      'shared.faq-item': SharedFaqItem;
      'shared.faq-section': SharedFaqSection;
      'solution.architecture-item': SolutionArchitectureItem;
      'solution.architecture-section': SolutionArchitectureSection;
      'solution.bicri-card': SolutionBicriCard;
      'solution.bicri-features': SolutionBicriFeatures;
      'solution.bnpl-workflow-section': SolutionBnplWorkflowSection;
      'solution.collection-card': SolutionCollectionCard;
      'solution.collection-cards': SolutionCollectionCards;
      'solution.customer-success': SolutionCustomerSuccess;
      'solution.feature-card': SolutionFeatureCard;
      'solution.feature-section': SolutionFeatureSection;
      'solution.partnership-model': SolutionPartnershipModel;
      'solution.partnership-models-section': SolutionPartnershipModelsSection;
      'solution.stat': SolutionStat;
      'solution.success-stats': SolutionSuccessStats;
      'solution.workflow-feature': SolutionWorkflowFeature;
      'solution.workflow-section': SolutionWorkflowSection;
      'solution.workflow-step': SolutionWorkflowStep;
    }
  }
}
