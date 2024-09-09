import React, { useEffect, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newImage, setNewImage] = useState({ title: '', url: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchImages = () => {
            const Data = [
                {
                    id: 1,
                    url: 'https://picsum.photos/id/1/300/200',
                    title: 'Image 1',
                },
                {
                    id: 2,
                    url: 'https://picsum.photos/id/2/300/200',
                    title: 'Image 2',
                },
                {
                    id: 3,
                    url: 'https://picsum.photos/id/3/300/200',
                    title: 'Image 3',
                },
                {
                    id: 4,
                    url: 'https://picsum.photos/id/4/300/200',
                    title: 'Image 4',
                },
                {
                    id: 5,
                    url: 'https://picsum.photos/id/5/300/200',
                    title: 'Image 5',
                },
                {
                    id: 6,
                    url: 'https://picsum.photos/id/6/300/200',
                    title: 'Image 6',
                },
            ];
            setImages(Data);
        };

        fetchImages();
    }, []);

    const deleteImage = (id) => {
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
    };

    const addImage = () => {
        if (newImage.title && newImage.url) {
            const newId = images.length > 0 ? images[images.length - 1].id + 1 : 1;
            setImages([...images, { id: newId, ...newImage }]);
            setNewImage({ title: '', url: '' });
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSort = () => {
        const sortedImages = [...images].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            }
            return b.title.localeCompare(a.title);
        });
        setImages(sortedImages);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const filteredImages = images.filter((image) =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="gallery-container">
            <h1 className="heading">Your Gallery</h1>
            
            {/* Search Bar */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search images by title..."
                value={searchTerm}
                onChange={handleSearch}
            />

            {/* Add New Image */}
            <div className="add-image-form">
                <input
                    type="text"
                    placeholder="Image Title"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newImage.url}
                    onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                />
                <button onClick={addImage}>Add Image</button>
            </div>

            {/* Sort Button */}
            <button className="sort-button" onClick={toggleSort}>
                Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>

            {/* Image Gallery */}
            {filteredImages.length > 0 ? (
                <div className="image-grid">
                    {filteredImages.map((image) => (
                        <div className="image-card" key={image.id}>
                            <img
                                src={image.url}
                                alt={image.title}
                                onClick={() => openLightbox(image)}
                            />
                            <div className="image-details">
                                <h3>{image.title}</h3>
                                <button onClick={() => deleteImage(image.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No images found.</p>
            )}

            {/* Lightbox for larger image view */}
            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content">
                        <img src={selectedImage.url} alt={selectedImage.title} />
                        <h3>{selectedImage.title}</h3>
                        <button onClick={closeLightbox}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
