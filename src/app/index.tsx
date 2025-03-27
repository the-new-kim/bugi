import { useEffect, useState } from 'react';
import { AppRouter } from './router';
import { ThemeProvider } from '@/context/theme-context';
import { ServiceProvider } from '@/context/service-context';
import { ColumnService } from '@/features/column/service';
import { IndexedDBColumnRepository } from '@/features/column/repositories/idb-repository';

const COLUMN_STORE_NAME = 'column' as const;

function App() {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    console.log('Initializing IndexedDB...');
    const dbReq = indexedDB.open('bugi', 2);
    let currentDb: IDBDatabase | null = null;

    dbReq.onerror = (event) => {
      console.error('Database error:', event);
    };

    dbReq.onsuccess = (event) => {
      console.log('Database opened successfully');
      currentDb = (event.target as IDBOpenDBRequest).result;
      setDb(currentDb);
    };

    dbReq.onupgradeneeded = (event) => {
      console.log('Database upgrade in progress...');
      const newDb = (event.target as IDBOpenDBRequest).result;

      if (!newDb.objectStoreNames.contains(COLUMN_STORE_NAME)) {
        newDb.createObjectStore(COLUMN_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    return () => {
      if (currentDb) {
        currentDb.close();
      }
    };
  }, []);

  if (!db) {
    console.log('Waiting for database initialization...');
    return <div>Initializing database...</div>;
  }

  const kanbanColumnRepository = new IndexedDBColumnRepository(db);
  const columnService = new ColumnService(kanbanColumnRepository);

  return (
    <ThemeProvider>
      <ServiceProvider value={{ columnService }}>
        <AppRouter />
      </ServiceProvider>
    </ThemeProvider>
  );
}

export { App, COLUMN_STORE_NAME };
