"use client";

import React, { useState } from 'react';

// Example inline SVG strings
// (You can substitute the real paths if you want different arrow shapes or a more complete ChatGPT path.)
const CHATGPT_SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2/3 w-2/3"><text x="-9999" y="-9999">ChatGPT</text><path d="M9.20509 8.76511V6.50545C9.20509 6.31513 9.27649 6.17234 9.44293 6.0773L13.9861 3.46088C14.6046 3.10413 15.342 2.93769 16.103 2.93769C18.9573 2.93769 20.7651 5.14983 20.7651 7.50454C20.7651 7.67098 20.7651 7.86129 20.7412 8.05161L16.0316 5.2924C15.7462 5.12596 15.4607 5.12596 15.1753 5.2924L9.20509 8.76511ZM19.8135 17.5659V12.1664C19.8135 11.8333 19.6708 11.5955 19.3854 11.429L13.4152 7.95633L15.3656 6.83833C15.5321 6.74328 15.6749 6.74328 15.8413 6.83833L20.3845 9.45474C21.6928 10.216 22.5728 11.8333 22.5728 13.4031C22.5728 15.2108 21.5025 16.8758 19.8135 17.5657V17.5659ZM7.80173 12.8088L5.8513 11.6671C5.68486 11.5721 5.61346 11.4293 5.61346 11.239V6.00613C5.61346 3.46111 7.56389 1.53433 10.2042 1.53433C11.2033 1.53433 12.1307 1.86743 12.9159 2.46202L8.2301 5.17371C7.94475 5.34015 7.80195 5.57798 7.80195 5.91109V12.809L7.80173 12.8088ZM12 15.2349L9.20509 13.6651V10.3351L12 8.76534L14.7947 10.3351V13.6651L12 15.2349ZM13.7958 22.4659C12.7967 22.4659 11.8693 22.1328 11.0841 21.5382L15.7699 18.8265C16.0553 18.6601 16.198 18.4222 16.198 18.0891V11.1912L18.1723 12.3329C18.3388 12.4279 18.4102 12.5707 18.4102 12.761V17.9939C18.4102 20.5389 16.4359 22.4657 13.7958 22.4657V22.4659ZM8.15848 17.1617L3.61528 14.5452C2.30696 13.784 1.42701 12.1667 1.42701 10.5969C1.42701 8.76534 2.52115 7.12414 4.20987 6.43428V11.8574C4.20987 12.1905 4.35266 12.4284 4.63802 12.5948L10.5846 16.0436L8.63415 17.1617C8.46771 17.2567 8.32492 17.2567 8.15848 17.1617ZM7.897 21.0625C5.20919 21.0625 3.23488 19.0407 3.23488 16.5432C3.23488 16.3529 3.25875 16.1626 3.2824 15.9723L7.96817 18.6839C8.25352 18.8504 8.53911 18.8504 8.82446 18.6839L14.7947 15.2351V17.4948C14.7947 17.6851 14.7233 17.8279 14.5568 17.9229L10.0136 20.5393C9.39518 20.8961 8.6578 21.0625 7.89677 21.0625H7.897ZM13.7958 23.8929C16.6739 23.8929 19.0762 21.8474 19.6235 19.1357C22.2874 18.4459 24 15.9484 24 13.4034C24 11.7383 23.2865 10.121 22.002 8.95542C22.121 8.45588 22.1924 7.95633 22.1924 7.45702C22.1924 4.0557 19.4331 1.51045 16.2458 1.51045C15.6037 1.51045 14.9852 1.60549 14.3668 1.81968C13.2963 0.773071 11.8215 0.107086 10.2042 0.107086C7.32606 0.107086 4.92383 2.15256 4.37653 4.86425C1.7126 5.55411 0 8.05161 0 10.5966C0 12.2617 0.713506 13.879 1.99795 15.0446C1.87904 15.5441 1.80764 16.0436 1.80764 16.543C1.80764 19.9443 4.56685 22.4895 7.75421 22.4895C8.39632 22.4895 9.01478 22.3945 9.63324 22.1803C10.7035 23.2269 12.1783 23.8929 13.7958 23.8929Z" fill="currentColor"></path></svg>
`;

const ARROW_SVG = `
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M14 3h7v7h-2V6.414L7.707 17.707l-1.414-1.414L17.586 5H14V3z"/>
</svg>
`;

export default function Home() {
  // State for the user’s prompt
  const [prompt, setPrompt] = useState('');

  // State for generated code
  const [vanillaCode, setVanillaCode] = useState('');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');
  const [svelteCode, setSvelteCode] = useState('');

  // Which tab is active
  const [activeTab, setActiveTab] = useState('vanilla');

  // Hover state for the preview button
  const [isHovering, setIsHovering] = useState(false);

  // Generate code strings for each framework, injecting both the ChatGPT icon and arrow icon
  function generateCode(userPrompt) {
    const encoded = encodeURIComponent(userPrompt);

    // This style block is just an example. 
    // Customize as you like or remove styles if unneeded.
    const buttonStyle = `
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 9999px;
      padding: 0.5rem;
      font-size: 13px;
      font-weight: 500;
      color: #5d5d5d;
      background-color: transparent;
      cursor: pointer;
    `;
    const hoverNote = `/* For hover, you'd typically use CSS. Inline onmouseover is also possible. */`;

    // Vanilla: inline HTML + onClick
    const vanilla =
      `<button
  onclick="window.open('https://chatgpt.com/?q=${encoded}','_blank')"
  style="${buttonStyle}"
  onmouseover="this.style.backgroundColor='#f9f9f9'"
  onmouseout="this.style.backgroundColor='transparent'"
>
  <!-- ChatGPT Icon -->
  <span>${CHATGPT_SVG}</span>
  <!-- Text -->
  <span>ChatGPT</span>
  <!-- Arrow Icon -->
  <span>${ARROW_SVG}</span>
</button>
<!-- ${hoverNote} -->`;

    // React: function component that uses dangerouslySetInnerHTML for the SVG
    const react =
      `function ChatGPTButton({ query }) {
  const handleClick = () => {
    window.open(\`https://chatgpt.com/?q=\${encodeURIComponent(query)}\`, '_blank');
  };

  const buttonStyle = {
    ${buttonStyle
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join(' ')}
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <span
        dangerouslySetInnerHTML={{ __html: \`${CHATGPT_SVG}\` }}
      />
      <span>ChatGPT</span>
      <span
        dangerouslySetInnerHTML={{ __html: \`${ARROW_SVG}\` }}
      />
    </button>
  );
}

// Usage:
// <ChatGPTButton query="${userPrompt}" />
`;

    // Vue: <button @click="..." :style="..." v-html="..."
    const vue =
      `<template>
  <button
    @mouseover="isHover = true"
    @mouseout="isHover = false"
    @click="openChatGPT"
    :style="buttonStyle"
  >
    <span v-html="CHATGPT_SVG" />
    <span>ChatGPT</span>
    <span v-html="ARROW_SVG" />
  </button>
</template>

<script>
export default {
  name: "ChatGPTButton",
  props: {
    query: String
  },
  data() {
    return {
      isHover: false,
      CHATGPT_SVG: \`${CHATGPT_SVG}\`,
      ARROW_SVG: \`${ARROW_SVG}\`
    };
  },
  computed: {
    buttonStyle() {
      return \`${buttonStyle}\${this.isHover ? 'background-color: #f9f9f9;' : ''}\`;
    }
  },
  methods: {
    openChatGPT() {
      const encoded = encodeURIComponent(this.query);
      window.open(\`https://chatgpt.com/?q=\${encoded}\`, '_blank');
    }
  }
}
</script>
<!-- ${hoverNote} -->`;

    // Svelte: <button on:click={...} {@html} for SVG
    const svelte =
      `<script>
  export let query = "";
  let isHover = false;

  const CHATGPT_SVG = \`${CHATGPT_SVG}\`;
  const ARROW_SVG   = \`${ARROW_SVG}\`;

  function openChatGPT() {
    const encoded = encodeURIComponent(query);
    window.open(\`https://chatgpt.com/?q=\${encoded}\`, '_blank');
  }

  $: buttonStyle = \`${buttonStyle}\${isHover ? 'background-color: #f9f9f9;' : ''}\`;
</script>

<button
  style={buttonStyle}
  on:click={openChatGPT}
  on:mouseover={() => isHover = true}
  on:mouseout={() => isHover = false}
>
  <span>{@html CHATGPT_SVG}</span>
  <span>ChatGPT</span>
  <span>{@html ARROW_SVG}</span>
</button>
<!-- ${hoverNote} -->`;

    return { vanilla, react, vue, svelte };
  }

  // Handle click of the "Create" button
  function handleCreate() {
    const userPrompt = prompt.trim();
    const codes = generateCode(userPrompt);
    setVanillaCode(codes.vanilla);
    setReactCode(codes.react);
    setVueCode(codes.vue);
    setSvelteCode(codes.svelte);
  }

  // ---- Inline styles for layout ----
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
  };

  const leftPanelStyle = {
    width: '40%',
    padding: '1rem',
    boxSizing: 'border-box',
    borderRight: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const rightPanelStyle = {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  };

  const tabsStyle = {
    display: 'flex',
    borderBottom: '1px solid #ccc',
  };

  const tabButtonStyle = (tabName) => ({
    padding: '0.5rem 1rem',
    background: 'none',
    border: 'none',
    borderRight: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: activeTab === tabName ? '#eee' : 'transparent',
  });

  const tabContentCommon = {
    display: 'none',
    padding: '1rem',
    overflowY: 'auto',
    height: 'calc(50vh - 40px)',
  };

  const tabContentActive = {
    ...tabContentCommon,
    display: 'block',
  };

  const previewSectionStyle = {
    borderTop: '1px solid #ccc',
    padding: '1rem',
    height: '50vh',
    overflowY: 'auto',
  };

  // The style for the preview ChatGPT button (icon + text + arrow)
  const previewButtonStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#5d5d5d',
    fontWeight: 500,
    fontSize: '13px',
    padding: '.5rem',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '9999px',
    minWidth: '2rem',
    height: '2.25rem',
    backgroundColor: isHovering ? '#f9f9f9' : 'transparent',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      {/* Left panel */}
      <div style={leftPanelStyle}>
        <div>
          <label htmlFor="prompt" style={{ fontWeight: 'bold' }}>Prompt</label><br />
          <input
            id="prompt"
            type="text"
            placeholder="Type your prompt here..."
            style={{ width: '100%', marginTop: '0.25rem', padding: '0.5rem' }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          onClick={handleCreate}
          style={{
            backgroundColor: 'green',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '0.25rem',
            width: '100px',
          }}
        >
          Create
        </button>
      </div>

      {/* Right panel */}
      <div style={rightPanelStyle}>
        {/* Tabs */}
        <div style={tabsStyle}>
          <button style={tabButtonStyle('vanilla')} onClick={() => setActiveTab('vanilla')}>
            Vanilla
          </button>
          <button style={tabButtonStyle('react')} onClick={() => setActiveTab('react')}>
            React
          </button>
          <button style={tabButtonStyle('vue')} onClick={() => setActiveTab('vue')}>
            Vue
          </button>
          <button style={tabButtonStyle('svelte')} onClick={() => setActiveTab('svelte')}>
            Svelte
          </button>
        </div>

        {/* Tab contents */}
        <div style={activeTab === 'vanilla' ? tabContentActive : tabContentCommon}>
          <pre>{vanillaCode}</pre>
        </div>
        <div style={activeTab === 'react' ? tabContentActive : tabContentCommon}>
          <pre>{reactCode}</pre>
        </div>
        <div style={activeTab === 'vue' ? tabContentActive : tabContentCommon}>
          <pre>{vueCode}</pre>
        </div>
        <div style={activeTab === 'svelte' ? tabContentActive : tabContentCommon}>
          <pre>{svelteCode}</pre>
        </div>

        {/* Preview */}
        <div style={previewSectionStyle}>
          <h3>Preview</h3>
          <button
            style={previewButtonStyle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() =>
              window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt.trim())}`, '_blank')
            }
          >
            {/* ChatGPT Icon */}
            <span
              dangerouslySetInnerHTML={{ __html: CHATGPT_SVG }}
            />
            <span>Open in ChatGPT</span>
            {/* Arrow Icon */}
            <span
              dangerouslySetInnerHTML={{ __html: ARROW_SVG }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
