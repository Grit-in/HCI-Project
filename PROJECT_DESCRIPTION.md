# SFHub - Street Fighter 6 Learning Platform
## Project Description and Functional Overview

### Website Overview
SFHub is a comprehensive learning platform dedicated to Street Fighter 6, designed to help players improve their skills through various resources including character guides, matchup information, frame data, and community interaction.

### Navigation Structure

#### Main Navigation Menu
The website features a responsive navigation bar with the following sections:
- **Home Page** (`index.html`) - Landing page with introduction and overview
- **MatchUp Guide** (`html/mu.html`) - Character matchup strategies and videos
- **Character Guide** (`html/tech.html`) - Character-specific techniques and combos
- **Forum** (`html/forum.html`) - Community discussion and posts
- **Frame Data** (`html/fdata.html`) - Detailed character move statistics

#### User Authentication
- **Sign Up/Login System** - Modal popup with tabbed interface
- **Form Validation** - Comprehensive client-side validation with custom rules
- **User Registration** - Email, username, and password validation

### Page-by-Page Content Description

#### 1. Home Page (index.html)
**Content:**
- Hero section with main heading and call-to-action button
- Embedded video showcasing rank progression
- Service cards highlighting learning opportunities
- Social media links table
- Responsive navigation with hamburger menu

**Interactive Elements:**
- Sign up button triggers authentication modal
- Social media icons link to external platforms
- Responsive navigation toggle for mobile devices

#### 2. MatchUp Guide (html/mu.html)
**Content:**
- Character selection dropdown with all SF6 characters
- Video filtering system by character
- Dynamic video content display
- Character-specific matchup strategies

**Interactive Elements:**
- Character filter dropdown changes displayed content
- Video player controls
- Dynamic content loading based on selection

#### 3. Character Guide (html/tech.html)
**Content:**
- Same structure as MatchUp Guide but focused on character-specific techniques
- Video tutorials for each character
- Combo demonstrations and explanations

**Interactive Elements:**
- Character-based video filtering
- Video playback controls
- Dynamic content management

#### 4. Forum (html/forum.html)
**Content:**
- Forum post listings
- Post titles and descriptions
- Author information
- "Read More" links to detailed posts

**Interactive Elements:**
- Clickable forum posts
- Navigation to detailed post views
- User interaction elements

#### 5. Frame Data (html/fdata.html)
**Content:**
- Character image display
- Comprehensive move data table
- Frame data for all character moves
- Visual indicators for positive/negative frame advantages

**Interactive Elements:**
- Character image display
- Data table with hover effects
- Color-coded frame advantage indicators

### Technical Implementation

#### HTML Elements Used
- **Headings** (h1, h2, h3) - Used throughout for page structure
- **Paragraphs** - Content descriptions and explanations with rich formatting
- **Text Formatting** - **Bold**, *italic*, and <u>underlined</u> text throughout content
- **Tables** - Complex frame data tables with colspan/rowspan attributes
- **Lists** - Ordered and unordered lists for character strengths/weaknesses
- **Forms** - Authentication system with comprehensive validation
- **Images** - Character portraits and logos with interactive features
- **Clickable Images** - Character images with onclick events and hover effects
- **Videos** - Embedded tutorial content with controls
- **Links** - Navigation and external references
- **Document Links** - PDF links for character guides and frame data
- **iFrames** - Video content embedding
- **Select Elements** - Character selection and category filtering
- **Textarea** - Forum post creation

#### CSS Implementation
- **External CSS** - Main styling in `css/style.css`
- **Internal CSS** - Component-specific styles
- **Inline CSS** - Dynamic styling via JavaScript
- **Box Model** - Comprehensive use of margins, padding, borders
- **Positioning** - Fixed, relative, and absolute positioning
- **Complex Selectors** - Element, ID, class, and pseudo-class selectors
- **Responsive Design** - Mobile-first approach with media queries

#### JavaScript Functionality
- **DOM Manipulation** - Dynamic content creation, modification, and removal
- **Event Handling** - Click, submit, scroll, change, mouseover, mouseout, keydown, dblclick, contextmenu, and input events
- **Form Validation** - HTML5 validation combined with custom JavaScript validation including:
  - Email format validation
  - Password strength requirements (uppercase, lowercase, numbers, special characters)
  - Username length and character validation
  - Real-time validation feedback with visual indicators
- **Dynamic Styling** - CSS class toggling, style property changes, and animated transitions
- **Content Filtering** - Character-based video filtering and forum category filtering
- **Modal Management** - Dynamic modal creation and management for forum posts and character details
- **CSS Animations** - JavaScript-driven CSS animations for enhanced user experience
- **Character Switching** - Dynamic character data updates with animations
- **Interactive Elements** - Hover effects, click animations, and visual feedback
- **Clickable Images** - Character images with onclick events and modal popups
- **Document Linking** - PDF document links with hover effects and transitions

### User Experience Features
- **Responsive Design** - Works on all device sizes with mobile-first approach
- **Smooth Animations** - CSS transitions, hover effects, and JavaScript-driven animations
- **Intuitive Navigation** - Clear menu structure with visual feedback
- **Interactive Elements** - Hover effects, click animations, and visual feedback
- **Accessibility** - Proper semantic HTML, ARIA labels, and keyboard navigation
- **Real-time Feedback** - Form validation with immediate visual feedback
- **Dynamic Content** - Character switching with smooth transitions
- **Modal Interactions** - Smooth modal animations and backdrop interactions
- **Category Filtering** - Dynamic content filtering with animations
- **Notification System** - Success/error notifications with animations

### Content Management
- **Dynamic Content Loading** - JavaScript-driven content display with animations
- **Filtering System** - Character-based video filtering and forum category filtering
- **Video Integration** - Embedded tutorial content with character-specific organization
- **Community Features** - Enhanced forum system with post creation, categorization, and interaction
- **Character Data Management** - Dynamic character switching with comprehensive data updates
- **Form Management** - Advanced form handling with validation and user feedback
- **Modal Content** - Dynamic modal creation for forum posts and user interactions

This website provides a comprehensive learning experience for Street Fighter 6 players, combining educational content with community features in an intuitive and responsive design.

## Vue.js Implementation (Alternative Version)

The project also includes a Vue.js version that demonstrates modern frontend development practices:

### Vue.js Features:
- **Component-Based Architecture** - Modular, reusable components
- **Vue Router** - Client-side routing with navigation guards
- **Vuex State Management** - Centralized state management for character data and forum posts
- **Vue Directives** - v-if, v-for, v-model, v-on, v-bind, v-show
- **Reactive Data Binding** - Two-way data binding and reactive updates
- **Event Handling** - Vue-specific event handling and custom events
- **Computed Properties** - Derived state and filtered data
- **Lifecycle Hooks** - Component lifecycle management

### Vue.js Structure:
- **Components**: NavBar, CharacterCard, ForumPost, VideoPlayer
- **Views**: Home, MatchUpGuide, CharacterGuide, Forum, FrameData
- **Store**: Character data, authentication state, forum posts
- **Router**: Navigation between pages with route guards

### Benefits of Vue.js Version:
- **Maintainability** - Modular code structure
- **Scalability** - Easy to add new features
- **Performance** - Virtual DOM and optimized rendering
- **Developer Experience** - Hot reloading and debugging tools
- **State Management** - Centralized data flow
