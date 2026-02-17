import { animeSeasons } from '../services/animeService'
import { QueryWraper } from '@tanstack/react-query';
import SeasonPicker from '../components/animeSeasonsPage/SeasonPicker';
import UpcomingSeasons from '../components/animeSeasonsPage/UpcomingSeasons';
import AnimeSeasonContent from '../components/animeSeasonsPage/animeSeasonContent';
import { useSearchParams } from 'react-router-dom';

const AnimeSeasonsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Extract current values from URL (with defaults)
    const year = searchParams.get('year');
    const season = searchParams.get('season');
    const type = searchParams.get('type') || 'current';

    return (
        <main>
            <h1>Explore Seasons</h1>

            <SeasonPicker
                currentFilters={{ year, season, type }}
                onSearch={(newFilters) => setSearchParams(newFilters)}
            />

            <hr />

            <QueryWraper loadingMessage="Loading season content...">
                <AnimeSeasonContent />
            </QueryWraper>
            <ErrorBoundary fallback={<p>Failed to load anime.</p>}>
                <Suspense fallback={<GridSkeleton />}>
                    <SeasonalAnimeContent
                        year={year}
                        season={season}
                        type={type}
                    />
                </Suspense>
            </ErrorBoundary>
        </main>
    );
};