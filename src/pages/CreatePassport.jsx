import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StepIndicator from '../components/ui/StepIndicator';
import DisclaimerBanner from '../components/ui/DisclaimerBanner';
import IngredientVisualizer3D from '../components/3d/IngredientVisualizer3D';
import { showToast } from '../components/ui/Toast';

const STEPS = ['Product Basics', 'Ingredients', 'Traditional Basis', 'Innovation', 'Target Market', 'Review'];

const TRADITIONAL_BASIS_OPTIONS = [
  'Classical Ayurvedic Text',
  'Community Knowledge',
  'Existing Product',
  'New Research',
  'Combination',
  'Unknown',
];

const INNOVATION_TYPES = [
  'Composition',
  'Extraction Process',
  'Manufacturing Process',
  'Dosage / Form',
  'Delivery Device',
  'New Use',
  'Packaging / Design',
  'Other',
];

const STAGES = ['Concept', 'R&D', 'Pre-clinical', 'Pre-commercialization', 'Commercialization'];
const MARKETS = ['India', 'European Union', 'United States', 'Middle East', 'Southeast Asia', 'Other'];

const EMPTY_INGREDIENT = { name: '', source: '', biological: false, traditional: false, origin: '' };

function OptionGrid({ options, selected, onToggle, multi = false }) {
  return (
    <div className="option-grid">
      {options.map((opt) => {
        const isSelected = multi ? (selected || []).includes(opt) : selected === opt;
        return (
          <button
            key={opt}
            type="button"
            className={`option-btn ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggle(opt)}
          >
            {isSelected && <Check size={13} style={{ color: 'var(--color-primary)', marginRight: 4 }} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function CreatePassport() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    organization: '',
    stage: '',
    ingredients: [{ ...EMPTY_INGREDIENT }],
    traditionalBasis: '',
    innovationType: [],
    targetMarkets: [],
  });

  const updateForm = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const addIngredient = () =>
    setForm((f) => ({ ...f, ingredients: [...f.ingredients, { ...EMPTY_INGREDIENT }] }));

  const removeIngredient = (idx) =>
    setForm((f) => ({ ...f, ingredients: f.ingredients.filter((_, i) => i !== idx) }));

  const updateIngredient = (idx, field, value) =>
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing)),
    }));

  const toggleInnovationType = (val) => {
    setForm((f) => ({
      ...f,
      innovationType: f.innovationType.includes(val)
        ? f.innovationType.filter((v) => v !== val)
        : [...f.innovationType, val],
    }));
  };

  const toggleMarket = (val) => {
    setForm((f) => ({
      ...f,
      targetMarkets: f.targetMarkets.includes(val)
        ? f.targetMarkets.filter((v) => v !== val)
        : [...f.targetMarkets, val],
    }));
  };

  const canProceed = () => {
    if (step === 0) return form.name.trim() !== '';
    if (step === 1) return form.ingredients.some((i) => i.name.trim() !== '');
    if (step === 2) return form.traditionalBasis !== '';
    if (step === 3) return form.innovationType.length > 0;
    if (step === 4) return form.targetMarkets.length > 0;
    return true;
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      showToast('Innovation Passport generated successfully!', 'success');
      navigate('/passport/herbalx-001');
    }, 2200);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="product-name">Product Name *</label>
              <input id="product-name" className="form-input" placeholder="e.g. Herbal-X" value={form.name} onChange={(e) => updateForm('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="product-desc">Product Description *</label>
              <textarea id="product-desc" className="form-input form-textarea" placeholder="Describe your product, its purpose, and what makes it unique..." value={form.description} onChange={(e) => updateForm('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="org">Organization / Startup</label>
              <input id="org" className="form-input" placeholder="e.g. VedaVita Labs Pvt. Ltd." value={form.organization} onChange={(e) => updateForm('organization', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Innovation Stage</label>
              <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {STAGES.map((s) => (
                  <button key={s} type="button" className={`option-btn ${form.stage === s ? 'selected' : ''}`} onClick={() => updateForm('stage', s)}>
                    {form.stage === s && <Check size={13} style={{ color: 'var(--color-primary)', marginRight: 4 }} />}
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <div className="info-box mb-4">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                List all ingredients or components. For each, indicate whether it is a biological resource and whether traditional use is known. This information will be used for TK/ABS assessment.
              </p>
            </div>
            {form.ingredients.map((ing, idx) => (
              <div key={idx} className="ingredient-row">
                <div style={{ flex: 2 }}>
                  <input className="form-input" placeholder="Ingredient name (e.g. Ashwagandha)" value={ing.name} onChange={(e) => updateIngredient(idx, 'name', e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <input className="form-input" placeholder="Source / Origin" value={ing.source} onChange={(e) => updateIngredient(idx, 'source', e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 'var(--text-xs)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="checkbox" checked={ing.biological} onChange={(e) => updateIngredient(idx, 'biological', e.target.checked)} />
                    Biological resource
                  </label>
                  <label style={{ fontSize: 'var(--text-xs)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="checkbox" checked={ing.traditional} onChange={(e) => updateIngredient(idx, 'traditional', e.target.checked)} />
                    Traditional use known
                  </label>
                </div>
                {form.ingredients.length > 1 && (
                  <button onClick={() => removeIngredient(idx)} className="btn btn-ghost btn-icon" aria-label="Remove ingredient">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button className="btn btn-outline btn-sm" onClick={addIngredient}>
                <Plus size={14} /> Add Ingredient
              </button>
            </div>

            {/* 3D Botanical Visualizer as Reference */}
            <div className="mt-6">
              <IngredientVisualizer3D />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
              What is the basis of your formulation? This helps determine potential traditional knowledge considerations.
            </p>
            <OptionGrid options={TRADITIONAL_BASIS_OPTIONS} selected={form.traditionalBasis} onToggle={(v) => updateForm('traditionalBasis', v)} />
            {form.traditionalBasis && (
              <div className="info-box mt-5">
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-sage)', marginBottom: 4 }}>NOTE</div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  {form.traditionalBasis === 'Classical Ayurvedic Text'
                    ? 'Formulations based on classical texts may have significant traditional knowledge considerations and prior-art implications for patent pathways.'
                    : form.traditionalBasis === 'New Research'
                    ? 'Novel research-based formulations may have stronger patent pathways, but TK/ABS compliance still applies if biological resources are used.'
                    : 'Traditional knowledge basis will be assessed for IP pathways and prior-art considerations.'}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
              What is actually new in your innovation? Select all that apply. This determines your strongest IP protection pathways.
            </p>
            <OptionGrid options={INNOVATION_TYPES} selected={form.innovationType} onToggle={toggleInnovationType} multi />
            {form.innovationType.length > 0 && (
              <div className="success-box mt-5">
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  <strong>Selected:</strong> {form.innovationType.join(', ')}
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
              Select all target markets. Each jurisdiction has different IP, regulatory, and market access requirements.
            </p>
            <OptionGrid options={MARKETS} selected={form.targetMarkets} onToggle={toggleMarket} multi />
            <div className="warning-box mt-5">
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warning)' }}>
                IP-SAKTI will provide jurisdiction-specific guidance for each selected market. Requirements differ significantly between India, EU, USA, and other markets.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <div className="info-box mb-5">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Review the information below before generating your Innovation Passport. The passport will include preliminary classification, IP assessment, TK/ABS review, regulatory pathway, and action plan.
              </p>
            </div>

            {[
              { label: 'Product Name', value: form.name || '—' },
              { label: 'Organization', value: form.organization || '—' },
              { label: 'Stage', value: form.stage || '—' },
              { label: 'Traditional Basis', value: form.traditionalBasis || '—' },
              { label: 'Innovation Types', value: form.innovationType.join(', ') || '—' },
              { label: 'Target Markets', value: form.targetMarkets.join(', ') || '—' },
              { label: 'Ingredients', value: form.ingredients.filter(i => i.name).map(i => i.name).join(', ') || '—' },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ width: 180, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-light)', flexShrink: 0 }}>{row.label}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{row.value}</div>
              </div>
            ))}

            <div className="disclaimer-banner mt-6">
              <span>The generated passport contains preliminary assessments only. All outputs require validation by qualified IP, regulatory, and legal professionals.</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (generating) {
    return (
      <Layout title="Generating Passport" breadcrumb="Innovation Passport">
        <div className="page-container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-6)', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f0f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="loading-spinner" style={{ width: 44, height: 44 }} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 8 }}>Generating Innovation Passport</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                Analysing classification, IP pathways, TK/ABS considerations, and regulatory requirements...
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              {['Classification Engine', 'Knowledge Graph lookup', 'Evidence retrieval', 'Confidence assessment', 'Action plan generation'].map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={11} style={{ color: 'var(--color-success)' }} />
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Create Innovation Passport" breadcrumb="Innovation Passport">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Create Innovation Passport</h1>
          <p className="page-subtitle">Build a structured compliance and IP profile for your Ayurvedic product.</p>
        </div>

        <div className="wizard-container">
          <StepIndicator steps={STEPS} currentStep={step} />

          <div className="wizard-card">
            <h3 className="wizard-title">{STEPS[step]}</h3>
            <p className="wizard-desc">
              {step === 0 && 'Enter basic information about your product.'}
              {step === 1 && 'List all ingredients and their sources.'}
              {step === 2 && 'Identify the traditional basis of your formulation.'}
              {step === 3 && 'Describe what is genuinely new in your innovation.'}
              {step === 4 && 'Select your intended target markets.'}
              {step === 5 && 'Review all information before generating your passport.'}
            </p>

            {renderStep()}

            <div className="wizard-nav">
              <button
                className="btn btn-ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button className="btn btn-accent btn-lg" onClick={handleGenerate}>
                  <Sparkles size={16} /> Generate Innovation Passport
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
