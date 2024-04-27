import React from 'react';
import './sizingguide.css';

const SizingGuide = () => {
    return (
        <div className="sizing-guide-container">
            <div className="sizing-guide-content">
                <h2 className="sizing-guide-heading">Bunny Bubbles Nail Sizing Guide</h2>
                <p className="sizing-guide-text">Find the perfect fit for your Bunny Bubbles press-on nails with our sizing guide. Follow these steps to measure your nail beds accurately:</p>
                <ol className="sizing-guide-steps">
                    <li><strong>Clean your nails thoroughly to reveal their natural shape.</strong></li>
                    <br/>
                    <li>Using a soft measuring tape or string, gently measure the width of each nail bed from side to side.</li>
                    <li>Record the measurements in millimeters (mm) for each finger. Each nail deserves a snug fit!</li>
                    <li>Refer to the sizing chart below to find your perfect Bunny Bubbles nail size:</li>
                </ol>
                <br/>
                <table className="sizing-guide-table">
                    <thead>
                        <tr>
                            <th className="size-heading">Finger</th>
                            <th className="size-heading">XS</th>
                            <th className="size-heading">Small</th>
                            <th className="size-heading">Medium</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="finger">Thumb</td>
                            <td className="measurement">#3 (11.6mm)</td>
                            <td className="measurement">#2 (12.4mm)</td>
                            <td className="measurement">#1 (13.3mm)</td>
                        </tr>
                        <tr>
                            <td className="finger">Index</td>
                            <td className="measurement">#8 (8.9mm)</td>
                            <td className="measurement">#7 (9.2mm)</td>
                            <td className="measurement">#6 (9.7mm)</td>
                        </tr>
                        <tr>
                            <td className="finger">Middle</td>
                            <td className="measurement">#7 (9.2mm)</td>
                            <td className="measurement">#6 (9.7mm)</td>
                            <td className="measurement">#5 (10.2mm)</td>
                        </tr>
                        <tr>
                            <td className="finger">Ring</td>
                            <td className="measurement">#6 (9.7mm)</td>
                            <td className="measurement">#5 (10.2mm)</td>
                            <td className="measurement">#4 (10.6mm)</td>
                        </tr>
                        <tr>
                            <td className="finger">Pinky</td>
                            <td className="measurement">#10 (7.2mm)</td>
                            <td className="measurement">#9 (8.2mm)</td>
                            <td className="measurement">#8 (8.9mm)</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <br/>
                <p className="sizing-guide-note">Note: The widest nail size provided is 13.9mm.</p>
            </div>
            
        </div>
    );
}

export default SizingGuide;


