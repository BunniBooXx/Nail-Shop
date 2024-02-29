import React from 'react';
import './sizingguide.css';

const SizingGuide = () => {
    return (
        <div className="sizing-guide-container">
            <div className="sizing-guide-content">
                <h2 className="sizing-guide-heading">Adorable Nail Sizing Guide</h2>
                <p className="sizing-guide-text">Discover the perfect fit for your precious press-on nails! Follow these simple steps to measure your nail beds accurately:</p>
                <ol className="sizing-guide-steps">
                    <li><strong>Clean your nails thoroughly to reveal their natural beauty.</strong></li>
                    <li>Snuggle up with a soft measuring tape or a piece of string to gently measure the width of each nail bed from side to side.</li>
                    <li>Record the measurements in millimeters (mm) for each finger. Remember, every finger deserves a snug and comfy fit!</li>
                    <li>Refer to our delightful sizing chart below to find your match made in nail heaven:</li>
                </ol>
                <table className="sizing-guide-table">
                    <thead>
                        <tr>
                            <th className="size-heading">Finger</th>
                            <th className="size-heading">XS</th>
                            <th className="size-heading">Small</th>
                            <th className="size-heading">Medium</th>
                            <th className="size-heading">Large</th>
                            <th className="size-heading">XL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="finger">Thumb</td>
                            <td className="measurement">23 mm</td>
                            <td className="measurement">25 mm</td>
                            <td className="measurement">27 mm</td>
                            <td className="measurement">29 mm</td>
                            <td className="measurement">31 mm</td>
                        </tr>
                        <tr>
                            <td className="finger">Index</td>
                            <td className="measurement">19 mm</td>
                            <td className="measurement">21 mm</td>
                            <td className="measurement">23 mm</td>
                            <td className="measurement">25 mm</td>
                            <td className="measurement">27 mm</td>
                        </tr>
                        <tr>
                            <td className="finger">Middle</td>
                            <td className="measurement">17 mm</td>
                            <td className="measurement">19 mm</td>
                            <td className="measurement">21 mm</td>
                            <td className="measurement">23 mm</td>
                            <td className="measurement">25 mm</td>
                        </tr>
                        <tr>
                            <td className="finger">Ring</td>
                            <td className="measurement">15 mm</td>
                            <td className="measurement">17 mm</td>
                            <td className="measurement">19 mm</td>
                            <td className="measurement">21 mm</td>
                            <td className="measurement">23 mm</td>
                        </tr>
                        <tr>
                            <td className="finger">Pinky</td>
                            <td className="measurement">13 mm</td>
                            <td className="measurement">15 mm</td>
                            <td className="measurement">17 mm</td>
                            <td className="measurement">19 mm</td>
                            <td className="measurement">21 mm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SizingGuide;


