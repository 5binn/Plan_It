import Link from 'next/link'
import './styles.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from './util/api';


export default function Logo({ }) {
    return (
        <div className='left '>
            <span className='text-lg'>편리한 일정 관리 서비스</span>
            <span className='mt-1 text-5xl font-bold'>Plan It</span>
            <div className='w-full mt-4'>
                <img className='ml-2 w-full' src="/planIt.png" alt="Plan It Logo" />
            </div>
        </div>
    )
}