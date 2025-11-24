#!/usr/bin/env node

// 简单的 tRPC 测试脚本
const testMusicGeneration = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/trpc/kie.generateMusic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'A calm and relaxing piano track with soft melodies',
        style: 'Classical',
        title: 'Peaceful Piano Meditation',
        customMode: true,
        instrumental: true,
        model: 'V3_5',
        negativeTags: 'Heavy Metal, Upbeat Drums'
      })
    });

    const result = await response.json();
    console.log('API Response:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testMusicGeneration();