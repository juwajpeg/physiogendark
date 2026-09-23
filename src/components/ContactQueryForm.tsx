"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactQueryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Name and message are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!res.ok) throw new Error('Failed to send query');

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setError('Failed to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center backdrop-blur-md max-w-xl mx-auto">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
        <h4 className="text-xl font-light text-white mb-2">Message Received</h4>
        <p className="text-sm text-gray-300 mb-6">
          Thank you for reaching out. Our clinical specialists will get in touch with you shortly.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          className="rounded-full bg-white/10 hover:bg-white/20 text-white text-xs px-6 py-2"
        >
          Send Another Query
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h4 className="text-xl font-light text-white">Send a Clinical Query</h4>
        <p className="text-sm text-gray-400 mt-1">Have questions about diagnosis, rehabilitation, or therapy protocols?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-light">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ali Ahmed"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-light">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-light">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ali@example.com"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-light">Clinical Message *</label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your condition, symptoms, or inquiry..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 text-sm resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full py-3 text-sm font-medium transition-all duration-300 shadow-lg hover:scale-[1.01]"
        >
          {loading ? (
            'Submitting Query...'
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Submit Clinical Query
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
