import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showToast } from '../../helpers/showToast';
import { getEvn } from '@/helpers/getEnv';

// Async thunks
export const fetchAllChannels = createAsyncThunk(
    'channel/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${getEvn('VITE_API_BASE_URL')}/channels`);
            return data.channels;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchChannelById = createAsyncThunk(
    'channel/fetchById',
    async (channelId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/channels/${channelId}`);
            return data.channel;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchChannelVideos = createAsyncThunk(
    'channel/fetchVideos',
    async (channelId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/channels/${channelId}/videos`);
            return data.videos;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const createChannel = createAsyncThunk(
    'channel/create',
    async (channelData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/channels`, channelData, {
                withCredentials: true
            });
            showToast('Channel created successfully', 'success');
            return data.channel;
        } catch (error) {
            showToast(error.response.data.message, 'error');
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateChannel = createAsyncThunk(
    'channel/update',
    async ({ channelId, updateData }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API_URL}/channels/${channelId}`, updateData, {
                withCredentials: true
            });
            showToast('Channel updated successfully', 'success');
            return data.channel;
        } catch (error) {
            showToast(error.response.data.message, 'error');
            return rejectWithValue(error.response.data.message);
        }
    }
);

const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channels: [],
        currentChannel: null,
        channelVideos: [],
        loading: false,
        error: null
    },
    reducers: {
        clearChannelState: (state) => {
            state.currentChannel = null;
            state.channelVideos = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all channels
            .addCase(fetchAllChannels.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllChannels.fulfilled, (state, action) => {
                state.loading = false;
                state.channels = action.payload;
                state.error = null;
            })
            .addCase(fetchAllChannels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch channel by ID
            .addCase(fetchChannelById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChannelById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentChannel = action.payload;
                state.error = null;
            })
            .addCase(fetchChannelById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch channel videos
            .addCase(fetchChannelVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChannelVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.channelVideos = action.payload;
                state.error = null;
            })
            .addCase(fetchChannelVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create channel
            .addCase(createChannel.pending, (state) => {
                state.loading = true;
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.loading = false;
                state.currentChannel = action.payload;
                state.error = null;
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update channel
            .addCase(updateChannel.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                state.loading = false;
                state.currentChannel = action.payload;
                state.error = null;
            })
            .addCase(updateChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearChannelState } = channelSlice.actions;
export default channelSlice.reducer;
